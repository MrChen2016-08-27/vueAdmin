<template>
    <div id="user-list" >
        <header-title icon="person-stalker" >用户列表</header-title>
        <div class="flex-layout">
            <div class="left-menus" >
                <organization-tree
                    ref="orgTree"
                    @on-select="selectTree"
                >
                </organization-tree>
            </div>
            <div class="right-content" >
                <!-- <Button @click="modal1 = true" type="primary" >新增</Button> -->
                <Table :columns="columns1" :data="data1"></Table>
                <!-- <Page class="flex-end-sort-block" :total="total" size="small" show-elevator show-sizer></Page> -->
            </div>
        </div>
        <Modal
            v-model="modal1"
            title="新增用户"
            @on-ok="addUser('formInline')"
            >
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="username">
                    <Input type="text" v-model="formInline.username" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import HeaderTitle from '@/components/HeaderTitle';
import userApi from '@/api/user';
import OrganizationTree from '@/components/OrganizationTree';
export default {
    name: 'UserList',
    data() {
        const btnStyle = {
            marginRight: '5px'
        }
        return {
            data1: [],
            total: 0,
            modal1: false,
            formInline: {
                userName: '',
                username: '',
                password: ''
            },
            ruleInline: {
                username: [
                    { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                ]
            },
            columns1: [
                {
                    type: 'index',
                    align: 'center',
                    width: 50,
                },
                {
                    title: '用户名',
                    key: 'name',
                    minWidth: 100
                },
                {
                    title: '角色',
                    key: 'role',
                    minWidth: 80
                },
                {
                    title: '操作',
                    key: 'action',
                    minWidth: 150,
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
                            }, '编辑角色'),
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
    created() {
        this.getUserList();
    },
    methods: {
        async getUserList() {
            const res = await userApi.getUsers({ pageNumber: 1, pageSize: 10 });
            this.data1 = res.data.data.rows;
        },
        addUser(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    userApi.addUser(this.formInline);
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        selectTree() {

        }
    },
    components: {
        HeaderTitle,
        OrganizationTree
    }
}
</script>

<style lang="less" scoped>
@import url('../../styles/common.less');
#user-list{

}
</style>


