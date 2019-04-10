<template>
    <div id="type-list">
        <header-title v-if="!columnId" icon="person-stalker">分类列表</header-title>
        <header-title v-else icon="person-stalker">子分类列表</header-title>
        <div class="page-flex-header">
            <div class="left-flex">
                <Button @click="viewAddType('formInline')" type="primary">新增分类</Button>
                <Button v-if="columnId" @click="$router.go(-1)" type="ghost">返回</Button>
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
        <Modal v-model="modal1" title="新增分类">
            <Form ref="formInline" :model="formInline" :label-width="100" :rules="ruleInline">
                <FormItem prop="name" label="名称">
                    <Input class="text-input" type="text" v-model="formInline.name"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="modal1 = false">取消</Button>
                <Button type="primary" @click="submitType('formInline')">确认</Button>
            </div>
        </Modal>
        <del-modal v-model="delModal" :delName="formInline.name" :deleteMethod="deleteType" :delId="selectId" @deleteSuccess="resetList()"></del-modal>
    </div>
</template>


<script>
import typeApi from '@/api/type'
import HeaderTitle from '@/components/HeaderTitle';
import ListMethods from '@/tool/list';
import DelModal from '@/components/DelModal';

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
                    { required: true, message: '请输入分类名称', trigger: 'blur' }
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
                    width: 200,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary'
                                },
                                on: {
                                   click: () => {
                                      this.viewEditType(params.row.id)
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
                                       this.viewDeleteType(params.row.id, params.row.name)
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
                pageSize: 10,
                columnId: ''
            }
        }
    },
    props: {
        columnId: {
            type: [String, Number],
            default: ''
        }
    },
    watch: {
        columnId (newColumnId) {
            this.params.columnId = newColumnId;
            this.getList();
        }
    },
    created () {
        this.params.columnId = this.columnId;
        this.getList();
    },
    components: {
        HeaderTitle,
        DelModal
    },
    methods: {
        ...ListMethods(typeApi.getTypeList, () => {}),
        deleteType: typeApi.deleteType,
        viewAddType(refName) {
            this.selectId = null;
            this.modal1 = true;
            this.$refs[refName].resetFields();
        },
        async viewEditType (id) {
            this.selectId = id;
            let { data } = await typeApi.getType(id);
            this.formInline = data.data;
            this.modal1 = true;
        },
        viewDeleteType (id, name) {
            this.selectId = id;
            this.formInline.name = name;
            this.delModal = true;
        },
        changePage (page) {
            this.params.pageNumber = page
            this.getList()
        },
        submitType (refName) {
            if (this.columnId) {
                this.formInline.columnId = this.columnId;
                console.log('this.columnId', this.columnId);
            }
            this.$refs[refName].validate(async (valid) => {
                if (valid) {
                    if (this.selectId) {
                        await typeApi.updateType(this.formInline);
                    } else {
                        await typeApi.addType(this.formInline);
                    }
                    this.modal1 = false;
                    this.resetList();
                }
            })
        },
    }
}
</script>


<style lang="less" scoped>
#type-list {
}
</style>

