<template>
    <div id="user-list">
        <header-title icon="person-stalker">用户列表</header-title>
        <div class="page-flex-header">
            <div class="left-flex">
                <Button @click="viewAddUser('formInline')" type="primary">{{ selectUser ? '编辑' : '新增' }}用户</Button>
                <Select v-model="params.roleId" style="width:200px; margin: 0px 10px;">
                    <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
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
        <Modal v-model="modal1" title="新增用户">
            <Form ref="formInline" :model="formInline" :label-width="100" :rules="ruleInline">
                <FormItem prop="mobile" label="手机账号">
                    <Input :disabled="selectUser ? true : false" class="text-input" type="text" v-model="formInline.mobile"></Input>
                </FormItem>
                <FormItem v-if="!selectUser" prop="password" label="密码">
                    <Input class="text-input" type="password" v-model="formInline.password" placeholder="Password"></Input>
                </FormItem>
                <FormItem label="昵称" prop="nickname">
                    <Input class="text-input" type="text" v-model="formInline.nickname"></Input>
                </FormItem>
                <FormItem label="出生日期" prop="birth">
                    <DatePicker type="date" placeholder="选择日期" v-model="formInline.birth"></DatePicker>
                </FormItem>
                <FormItem prop="gender" label="性别">
                    <RadioGroup v-model="formInline.gender">
                        <Radio :label="1">男</Radio>
                        <Radio :label="2">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="经验" prop="experience">
                    <Input class="text-input" type="text" v-model="formInline.experience"></Input>
                </FormItem>
                <FormItem prop="email" label="邮箱">
                    <Input class="text-input" type="text" v-model="formInline.email"></Input>
                </FormItem>
                <FormItem label="地址" prop="address">
                    <Input class="text-input" type="text" v-model="formInline.address"></Input>
                </FormItem>
                <FormItem label="角色" prop="roleIds">
                    <CheckboxGroup v-model="formInline.roleIds">
                        <Checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</Checkbox>
                    </CheckboxGroup>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="modal1 = false">取消</Button>
                <Button type="primary" @click="submitUser('formInline')">确认</Button>
            </div>
        </Modal>
        <Modal v-model="delModal" width="360">
            <p slot="header" class="delete-modal-header">
                <Icon type="ios-information-circle"></Icon>
                <span>删除用户</span>
            </p>
            <div style="text-align:center">
                <p>该操作将删除&nbsp;{{ selectUser ? selectUser.mobile : '' }}&nbsp;用户</p>
                <p>您是否要删除?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="del_loading" @click="deleteUser(selectUser.id)">删除</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import HeaderTitle from '@/components/HeaderTitle';
import userApi from '@/api/user';
import { getRoleList } from '@/api/role';
export default {
    name: 'UserList',
    data() {
        const btnStyle = {
            marginRight: '5px'
        }
        return {
            data1: [],
            keyword: '',
            total: 0,
            modal1: false,
            delModal: false,
            del_loading: false,
            loading: true,
            roleList: [],
            selectUser: null,
            params: {
                roleId: '',
                pageSize: 5 ,
                pageNumber: 1,
                keyword: ''
            },
            formInline: {
                mobile: '',
                password: '',
                nickname: '',
                birth: '',
                gender: '',
                experience: '',
                email: '',
                address: '',
                roleIds: [],
            },
            ruleInline: {
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                gender: [
                    { required: true, type: 'number', message: '请选择性别', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '请填写邮箱', trigger: 'blur' },
                ],
            },
            columns1: [
                {
                    type: 'index',
                    align: 'center',
                    width: 50,
                },
                {
                    title: '手机账号',
                    key: 'mobile',
                    minWidth: 100
                },
                {
                    title: '用户编号',
                    key: 'username',
                    minWidth: 100
                },
                {
                    title: '昵称',
                    key: 'nickname',
                    minWidth: 100
                },
                {
                    title: '角色',
                    key: 'role',
                    minWidth: 80,
                    render: (h, params) => {
                        let oLis = params.row.roles.map((role) => {
                            let oTag = h('Tag', { props: { color: role.id == 1? 'primary': 'success' }  }, role.name)
                            return h('li', {

                            }, [ oTag ]);
                        })
                        return h('ul', oLis);
                    }
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
                                       this.viewEditUser(params.row.id, 'formInline')
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
                                       this.viewDeleteUser(params.row, 'formInline')
                                   }
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
        this.getRoleList();
    },
    methods: {
        resetUserList () {
            this.params = {
                pageNumber: 1,
                pageSize: 10,
                keyword: ''
            }
            this.keyword = '';
            this.getUserList();
        },
        changePage (page) {
            this.params.pageNumber = page;
            this.getUserList();
        },
        async getRoleList () {
            let { data } = await getRoleList();
            this.roleList = data.data.list;
        },
        async getUserList() {
            this.loading = true;
            const res = await userApi.getUserList(this.params);
            this.data1 = res.data.data.list;
            this.total = res.data.data.count;
            this.loading = false;
        },
        submitUser(name) {
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    if (!this.selectUser) {
                        await userApi.addUser(this.formInline);
                    } else {
                        await userApi.updateAdminUser(this.formInline);
                    }
                    this.modal1 = false;
                    this.resetUserList();
                } else {
                    this.$Message.error('信息不完整!');
                }
            })
        },
        selectTree() {

        },
        viewAddUser(refName) {
            this.modal1 = true;
            this.selectUser = null;
            this.$refs[refName].resetFields();
            this.getRoleList();
            this.$set(this.ruleInline, 'password', [
                { required: true, min: 6, max: 16, message: this.$t('Password.Require'), trigger: 'blur' },
            ])
        },
        async viewEditUser(id, refName) {
            this.$refs[refName].resetFields();
            this.getRoleList();
            let { data } = await userApi.getUser(id);
            this.selectUser = data.data;
            this.$set(this, 'formInline', data.data)
            let roleIds = data.data.Roles.map(item => item.id)
            this.$set(this.formInline, 'roleIds', roleIds)
            delete this.formInline.Roles;
            this.modal1 = true;
            this.$set(this.ruleInline, 'password', [])

        },
        viewDeleteUser (select, refName) {
            this.selectUser = select;
            this.$refs[refName].resetFields();
            this.delModal = true;
        },
        async deleteUser (id) {
            await userApi.deleteUser(id)
            this.delModal = false;
            this.resetUserList();
        },
        searchList () {
            this.params.pageNumber = 1;
            this.params.keyword = this.keyword;
            this.getUserList();
        }
    },
    components: {
        HeaderTitle,
    }
}
</script>

<style lang="less" scoped>
@import url('../../styles/common.less');
#user-list {
}

.text-input {
    width: 200px;
}
</style>


