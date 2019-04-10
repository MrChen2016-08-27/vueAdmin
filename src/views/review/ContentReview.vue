<template>
    <div id="review-list">
        <header-title icon="person-stalker">内容审核</header-title>
        <div class="page-flex-header">
            <div class="left-flex">
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
    </div>
</template>

<script>
import reviewApi from '@/api/review'
import HeaderTitle from '@/components/HeaderTitle';
import ListMethods from '@/tool/list';

export default {
    data () {
        const btnStyle = {
            marginRight: '5px'
        }
        return {
            loading: false,
            formInline: {
                name: ''
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
                    minWidth: 140,
                },
                {
                    title: '创建时间',
                    key: 'createdAt',
                    minWidth: 140,
                    render: (h, params) => {
                        if (params.row.createdAt) {
                            return h('label', this.$moment(params.row.createdAt).format("YYYY-MM-DD HH:mm:ss"));
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
                    title: '审核状态',
                    key: 'reviewStatus',
                    width: 100,
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
                    title: '审核人',
                    key: 'reviewUser',
                    minWidth: 120,
                    render: (h, params) => {
                        let reviews = params.row.Reviews;
                        if (reviews.length > 0) {
                            return h('label', reviews[0].reviewUser);
                        }
                    }
                },
                {
                    title: '审核时间',
                    key: 'reviewUser',
                    minWidth: 140,
                    render: (h, params) => {
                        let reviews = params.row.Reviews;
                        if (reviews.length > 0) {
                            let time = this.$moment(reviews[0].createdAt).format("YYYY-MM-DD HH:mm:ss");
                            return h('label', time);
                        }
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 120,
                    render: (h, params) => {
                        let reviews = params.row.Reviews;
                        if (reviews.length > 0 && reviews[0].status == 1) {
                            return h('div', {
                                style: {
                                    textAlign: 'center'
                                }
                            }, [
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
                                }, '审核')
                            ]);
                        }
                    }
                }
            ],
            data1: [],
            total: 0,
            keyword: '',
            params: {
                keyword: '',
                pageNumber: 1,
                pageSize: 10,
            }
        }
    },
    created () {
        this.getList()
    },
    methods: {
        ...ListMethods(reviewApi.getReviewContentList, () => {}),
        changePage (page) {
            this.params.pageNumber = page
            this.getList()
        },
        viewEditContent (id) {
            this.$router.push({ name: 'Review/ContentDetail', query: { id } });
        }
    },
    components: {
        HeaderTitle
    }
}
</script>

<style lang="less" scoped>

</style>
