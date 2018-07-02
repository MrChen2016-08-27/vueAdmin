<template>
    <div id="authority-list" >
        <header-title icon="android-lock" >角色列表</header-title>
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>

<script>
import HeaderTitle from '@/components/HeaderTitle';

export default {
    name: 'AuthorityList',
    data() {
        const btnStyle = {
            marginRight: '5px'
        };
        return {
            data1: [
                {
                    name: '123456'
                }
            ],
            columns1: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '角色名称',
                    key: 'name'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 300,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary'
                                },
                                on: {
                                   click: () => {
                                       this.$router.push({ name: 'AuthManagerDetails' });
                                   }
                                },
                                style: btnStyle
                            }, '编辑权限'),
                            h('Button', {
                                props: {
                                    type: 'ghost'
                                },
                                style: btnStyle,
                                on: {
                                   
                                }
                            }, '修改名称'),
                            h('Button', {
                                props: {
                                    type: 'error'
                                },
                                on: {
                                   
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
        };
    },
    components: {
        HeaderTitle
    }
}
</script>

<style lang="less" scoped>
#authority-list{

}
</style>


