<template>
    <div id="type-list">
        <header-title icon="person-stalker">我的内容</header-title>
        <div class="page-flex-header">
            <div class="left-flex">
                <Button @click="viewAddContent()" type="primary">新增内容</Button>
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
        <del-modal v-model="delModal" :delName="formInline.name" :deleteMethod="deleteContent" :delId="selectId" @deleteSuccess="resetList()"></del-modal>
    </div>
</template>


<script>
import contentApi from '@/api/content'
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
                    { required: true, message: '请输入内容标题', trigger: 'blur' }
                ],
            },
            columns1: [
                {
                    type: 'index',
                    align: 'center',
                    width: 50,
                },
                {
                    title: '标题',
                    key: 'title',
                    maxWidth: 200,
                    minWidth: 160,
                },
                {
                    title: '描述',
                    key: 'description',
                    minWidth: 160,
                },
                {
                    title: '创建时间',
                    key: 'createdAt',
                    minWidth: 160,
                    render: (h, params) => {
                        if (params.row.createdAt) {
                            return h('label', this.$moment(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss"));
                        }
                    }
                },
                {
                    title: '修改时间',
                    key: 'updatedAt',
                    minWidth: 160,
                    render: (h, params) => {
                        if (params.row.updatedAt) {
                            return h('label', this.$moment(params.row.updatedAt).format("YYYY-MM-DD HH:mm:ss"));
                        }
                    }
                },
                {
                    title: '审核状态',
                    key: 'reviewStatus',
                    minWidth: 100,
                    render: (h, params) => {
                        let text = '';
                        let color = '';
                        let reviews = params.row.Reviews;
                        if (reviews.length > 0) {
                            switch (reviews[0].status) {
                                case -1:
                                    text = '未通过'
                                    color = 'error';
                                    break;
                                case 1:
                                    text = '审核中'
                                    color = 'primary'
                                    break;
                                case 2:
                                    text = '已通过'
                                    color = 'success'
                                    break;
                            }
                            return h('Tag', {
                                props: {
                                    color
                                },
                            }, text);
                        }
                    }
                },
                {
                    title: '创建人',
                    key: 'cuser',
                    minWidth: 120
                },
                {
                    title: '最后修改人',
                    key: 'muser',
                    minWidth: 120
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 160,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary'
                                },
                                on: {
                                   click: () => {
                                      this.viewEditContent(params.row.id)
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
                                       this.viewDeleteContent(params.row.id, params.row.name)
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
                columnId: '',
                typeId: ''
            }
        }
    },
    created () {
        this.getList();
    },
    components: {
        HeaderTitle,
        DelModal
    },
    methods: {
        ...ListMethods(contentApi.getMyContentList, () => {}),
        deleteContent: contentApi.deleteMyContent,
        viewAddContent(refName) {
            this.selectId = null;
            this.$router.push({ name: 'Content/MyDetail' });
        },
        async viewEditContent (id) {
            this.selectId = id;
            this.$router.push({ name: 'Content/MyDetail', query: { id } });
        },
        viewDeleteContent (id, name) {
            this.selectId = id;
            this.formInline.name = name;
            this.delModal = true;
        },
        changePage (page) {
            this.params.pageNumber = page
            this.getList()
        },
        submitContent (refName) {
            if (this.columnId) {
                this.formInline.columnId = this.columnId;
            }
            this.$refs[refName].validate(async (valid) => {
                if (valid) {
                    if (this.selectId) {
                        await contentApi.updateMyContent(this.formInline);
                    } else {
                        await contentApi.addMyContent(this.formInline);
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

