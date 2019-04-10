<template>
    <div id="module-list">
        <header-title icon="person-stalker">模块列表</header-title>
        <div class="page-flex-header">
            <div class="left-flex">
                <Button @click="viewAddModule('formInline')" type="primary">新增模块</Button>
            </div>
            <div class="seach-header-bar">
                <Input class="input-text" v-model="keyword"></Input>
                <Button @click="searchList" class="search-btn" shape="circle" type="primary" icon="ios-search"></Button>
            </div>
        </div>
        <Table :loading="loading" :columns="modules1" :data="data1"></Table>
        <div class="page-footer">
            <Page @on-change="changePage" :page-size="params.pageSize" :current="params.pageNumber" :total="total" show-elevator></Page>
        </div>
        <Modal v-model="modal1" title="新增模块">
            <Form ref="formInline" :model="formInline" :label-width="100" :rules="ruleInline">
                <FormItem prop="name" label="名称">
                    <Input class="text-input" type="text" v-model="formInline.name"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="modal1 = false">取消</Button>
                <Button type="primary" @click="submitModule('formInline')">确认</Button>
            </div>
        </Modal>
        <Modal v-model="delModal" width="360">
            <p slot="header" class="delete-modal-header">
                <Icon type="ios-information-circle"></Icon>
                <span>删除模块</span>
            </p>
            <div style="text-align:center">
                <p>该操作将删除&nbsp;{{ formInline ? formInline.name : '' }}&nbsp;</p>
                <p>您是否要删除?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="del_loading" @click="deleteModule(selectId)">删除</Button>
            </div>
        </Modal>
    </div>
</template>


<script>
import moduleApi from '@/api/module'
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
                    { required: true, message: '请输入模块名称', trigger: 'blur' }
                ],
            },
            modules1: [
                {
                    type: 'index',
                    align: 'center',
                    width: 50,
                },
                {
                    title: '名称',
                    key: 'name',
                    minWidth: 120
                },
                {
                    title: '创建时间',
                    key: 'createdAt',
                    minWidth: 100,
                    render: (h, params) => {
                        if (params.row.createdAt) {
                            return h('label', this.$moment(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss"));
                        }
                    }
                },
                {
                    title: '修改时间',
                    key: 'updatedAt',
                    minWidth: 100,
                    render: (h, params) => {
                        if (params.row.updatedAt) {
                            return h('label', this.$moment(params.row.updatedAt).format("YYYY-MM-DD HH:mm:ss"));
                        }
                    }
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
                                      this.viewEditModule(params.row.id)
                                   }
                                },
                                style: btnStyle
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error'
                                },
                                on: {
                                   click: () => {
                                       this.viewDeleteModule(params.row.id, params.row.name)
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
        this.getModuleList()
    },
    components: {
        HeaderTitle
    },
    methods: {
        viewAddModule (refName) {
            this.selectId = null;
            this.modal1 = true;
            this.$refs[refName].resetFields();
        },
        async viewEditModule (id) {
            this.selectId = id;
            let { data } = await moduleApi.getModule(id);
            this.formInline = data.data;
            this.modal1 = true;
        },
        viewDeleteModule (id, name) {
            this.selectId = id;
            this.formInline.name = name;
            this.delModal = true;
        },
        resetModuleList () {
            this.params = {
                pageNumber: 1,
                pageSize: 10,
                keyword: ''
            }
            this.keyword = '';
            this.getModuleList();
        },
        changePage (page) {
            this.params.pageNumber = page
            this.getModuleList()
        },
        searchList() {
            this.params.pageNumber = 1;
            this.params.pageSize = 10;
            this.params.keyword = this.keyword;
            this.getModuleList();
        },
        async getModuleList () {
            this.loading = true
            const { data } = await moduleApi.getModuleList(this.params)
            this.data1 = data.data.list
            this.total = data.data.count
            this.loading = false;
        },
        submitModule (refName) {
            this.$refs[refName].validate(async (valid) => {
                if (valid) {
                    if (this.selectId) {
                        await moduleApi.updateModule(this.formInline);
                    } else {
                        await moduleApi.addModule(this.formInline);
                    }
                    this.modal1 = false;
                    this.resetModuleList();
                }
            })
        },
        async deleteModule (id) {
            await moduleApi.deleteModule(id);
            this.delModal = false;
            this.resetModuleList();
        }
    }
}
</script>
