<template>
    <div id="type-list">
        <header-title icon="person-stalker">内容列表</header-title>
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
                    maxWidth: 200
                },
                {
                    title: '描述',
                    key: 'description',
                },
                {
                    title: '创建人',
                    key: 'cuser',
                    maxWidth: 150
                },
                {
                    title: '最后修改人',
                    key: 'muser',
                    maxWidth: 150
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
        ...ListMethods(contentApi.getContentList, () => {}),
        deleteContent: contentApi.deleteContent,
        viewAddContent(refName) {
            this.selectId = null;
            this.$router.push({ name: 'Content/Detail' });
        },
        async viewEditContent (id) {
            this.selectId = id;
            let { data } = await contentApi.getContent(id);
            this.formInline = data.data;
            this.modal1 = true;
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
                        await contentApi.updateContent(this.formInline);
                    } else {
                        await contentApi.addContent(this.formInline);
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

