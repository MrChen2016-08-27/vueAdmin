<template>
    <div id="column-list">
        <header-title icon="person-stalker">栏目列表</header-title>
        <div class="page-flex-header">
            <div class="left-flex">
                <Button @click="viewAddColumn('formInline')" type="primary">新增栏目</Button>
            </div>
            <div class="seach-header-bar">
                <Input class="input-text" v-model="keyword"></Input>
                <Button @click="searchList" class="search-btn" shape="circle" type="primary" icon="ios-search"></Button>
            </div>
        </div>
        <Table :loading="loading" :columns="columns1" :data="data1"></Table>
        <div class="page-footer">
            <Page @on-change="changePage" :page-size="params.pageSize" :current="params.pageNumber" :total="total" show-elevator></Page>
        </div>
        <Modal v-model="modal1" title="新增栏目">
            <Form ref="formInline" :model="formInline" :label-width="100" :rules="ruleInline">
                <FormItem prop="name" label="名称">
                    <Input class="text-input" type="text" v-model="formInline.name"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="modal1 = false">取消</Button>
                <Button type="primary" @click="submitColumn('formInline')">确认</Button>
            </div>
        </Modal>
        <Modal v-model="delModal" width="360">
            <p slot="header" class="delete-modal-header">
                <Icon type="ios-information-circle"></Icon>
                <span>删除栏目</span>
            </p>
            <div style="text-align:center">
                <p>该操作将删除&nbsp;{{ formInline ? formInline.name : '' }}&nbsp;</p>
                <p>您是否要删除?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="del_loading" @click="deleteColumn(selectId)">删除</Button>
            </div>
        </Modal>
    </div>
</template>


<script>
import columnApi from '@/api/column'
import HeaderTitle from '@/components/HeaderTitle';

export default {
    data () {
        const btnStyle = {
            marginRight: '5px'
        }
        return {
            selectId: '',
            keyword: '',
            loading: false,
            modal1: false,
            delModal: false,
            del_loading: false,
            formInline: {
                name: ''
            },
            ruleInline: {
                name: [
                    { required: true, message: '请输入栏目名称', trigger: 'blur' }
                ],
            },
            columns1: [
                {
                    type: 'index',
                    align: 'center',
                    width: 50,
                },
                {
                    title: '名称',
                    key: 'name',
                    minWidth: 100
                },
                {
                    title: '最后修改人',
                    key: 'cuser',
                    minWidth: 100
                },
                {
                    title: '操作',
                    key: 'action',
                    minWidth: 80,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary'
                                },
                                on: {
                                   click: () => {
                                      this.viewEditColumn(params.row.id)
                                   }
                                },
                                style: btnStyle
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'info'
                                },
                                on: {
                                   click: () => {
                                      this.$router.push({ name: 'Setting/ColumnTypeList', params: { columnId: params.row.id } });
                                   }
                                },
                                style: btnStyle
                            }, '设置子分类'),
                            h('Button', {
                                props: {
                                    type: 'error'
                                },
                                on: {
                                   click: () => {
                                       this.viewDeleteColumn(params.row.id, params.row.name)
                                   }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
            data1: [],
            total: 0,
            params: {
                keyword: '',
                pageNumber: 1,
                pageSize: 10
            }
        }
    },
    created () {
        this.getColumnList()
    },
    components: {
        HeaderTitle
    },
    methods: {
        viewAddColumn (refName) {
            this.selectId = null;
            this.modal1 = true;
            this.$refs[refName].resetFields();
        },
        async viewEditColumn (id) {
            this.selectId = id;
            let { data } = await columnApi.getColumn(id);
            this.formInline = data.data;
            this.modal1 = true;
        },
        viewDeleteColumn (id, name) {
            this.selectId = id;
            this.formInline.name = name;
            this.delModal = true;
        },
        resetColumnList () {
            this.params = {
                pageNumber: 1,
                pageSize: 10,
                keyword: ''
            }
            this.keyword = '';
            this.getColumnList();
        },
        changePage (page) {
            this.params.pageNumber = page
            this.getColumnList()
        },
        searchList() {
            this.params.pageNumber = 1;
            this.params.pageSize = 10;
            this.params.keyword = this.keyword;
            this.getColumnList();
        },
        async getColumnList () {
            this.loading = true
            const { data } = await columnApi.getColumnList(this.params)
            this.data1 = data.data.list
            this.total = data.data.count
            this.loading = false;
        },
        submitColumn (refName) {
            this.$refs[refName].validate(async (valid) => {
                if (valid) {
                    if (this.selectId) {
                        await columnApi.updateColumn(this.formInline);
                    } else {
                        await columnApi.addColumn(this.formInline);
                    }
                    this.modal1 = false;
                    this.resetColumnList();
                }
            })
        },
        async deleteColumn (id) {
            await columnApi.deleteColumn(id);
            this.delModal = false;
            this.resetColumnList();
        }
    }
}
</script>
