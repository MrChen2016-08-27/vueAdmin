<template>
    <div id="authority-list">
        <header-title icon="android-lock">角色列表</header-title>
        <div class="page-action-header">
            <Button type="primary" @click="showAddModal()">新增角色</Button>
        </div>
        <Table :loading="tableLoading" :columns="columns1" :data="data1"></Table>
        <div class="page-footer">
            <Page @on-change="changePage" :page-size="params.pageSize" :current="params.pageNumber" :total="total" show-elevator></Page>
        </div>
        <Modal v-model="addModal" :title="isEdit ? '编辑角色' : '新建角色'">
            <Form ref="addRoleForm" :model="roleForm" :rules="ruleValidate" :label-width="80">
                <FormItem label="角色名称" prop="name">
                    <Input v-model="roleForm.name" placeholder="请输入角色名称"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="addModal = false">取消</Button>
                <Button v-if="!isEdit" type="primary" @click="addRole()">继续</Button>
                <Button v-else type="primary" @click="updateRole()">确认</Button>
            </div>
        </Modal>
        <Modal v-model="delModal" width="360">
            <p slot="header" class="delete-modal-header">
                <Icon type="ios-information-circle"></Icon>
                <span>删除角色</span>
            </p>
            <div style="text-align:center">
                <p>该操作将删除&nbsp;{{ selectRole.name }}&nbsp;角色</p>
                <p>您是否要删除?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="del_loading" @click="deleteRole(selectRole.id)">删除</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import HeaderTitle from '@/components/HeaderTitle';
import { getRoleList, deleteRole, addRole, updateRole } from '@/api/role';

export default {
    name: 'AuthorityList',
    data () {
        const btnStyle = {
            marginRight: '5px'
        };
        return {
            del_loading: false,
            selectRole: {},
            data1: [],
            delModal: false,
            addModal: false,
            isEdit: true,
            tableLoading: true,
            total: 0,
            roleForm: {
                name: '',
            },
            params: {
                pageNumber: 1,
                pageSize: 10
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' }
                ]
            },
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
                                    ghost: 'ghost',
                                    type: 'info'
                                },
                                style: btnStyle,
                                on: {
                                    click: () => {
                                        this.showUpdateModal(params.row)
                                    }
                                }
                            }, '修改名称'),
                            h('Button', {
                                props: {
                                    type: 'primary'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({ name: 'System/AuthorityManager', params: { id: params.row.id } });
                                    }
                                },
                                style: btnStyle
                            }, '编辑权限'),
                            h('Button', {
                                props: {
                                    type: 'error'
                                },
                                on: {
                                    click: () => {
                                        this.showDelModal(params.row)
                                    }
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
    },
    created () {
        this.getRoleList();
    },
    methods: {
        changePage (page) {
            this.params.pageNumber = page;
            this.getRoleList();
        },
        showAddModal () {
            this.isEdit = false;
            this.selectRole = { name: '' };
            this.roleForm = {};
            this.addModal = true;
        },
        showDelModal (role) {
            this.delModal = true;
            this.selectRole = Object.assign({}, role);
        },
        showUpdateModal (role) {
            this.isEdit = true;
            this.addModal = true;
            delete role.authority;
            this.roleForm = Object.assign({}, role);
        },
        async addRole () {
            let valid = await this.$refs.addRoleForm.validate()
            if (!valid) {
                return;
            }
            let { data } = await addRole(this.roleForm)
            this.$router.push({ name: 'System/AuthorityManager', params: { id: data.data.id } });
        },
        async updateRole () {
            let valid = await this.$refs.addRoleForm.validate()
            if (!valid) {
                return;
            }
            let { data } = await updateRole(this.roleForm)
            this.addModal = false;
            this.getRoleList();
        },
        async deleteRole (id) {
            this.del_loading = true;
            try {
                await deleteRole(id);
                this.delModal = false;
                this.getRoleList();
            } catch (e) {
            }
            this.del_loading = false;
        },
        async getRoleList () {
            this.tableLoading = true;
            const res = await getRoleList(this.params);
            this.tableLoading = false;
            const { data } = res.data;
            if (res.data.meta.code == 200) {
                this.data1 = data.list;
                this.total = data.count;
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import url('../../styles/common.less');
#authority-list {
}
</style>


