<template>
    <div id="organization-list" >
        <header-title icon="grid" >组织架构</header-title>
        <div v-show="data1.length > 0" class="flex-layout">
            <div class="left-menus">
                <organization-tree
                    ref="orgTree"
                    @on-select="getNowDetails"
                    @loaded="loadTree"
                >
                </organization-tree>
            </div>
            <div class="right-content">
                <Button @click="() => { this.modal1 = true; this.update = false }" type="primary">新建下级组织</Button>
                <Card style="margin-top: 10px;">
                    <p slot="title">{{ nowSelect.name || '--' }}</p>
                    <a v-show="nowSelect.id" href="javascript:;" slot="extra" @click.prevent="editOrg" >
                        修改
                    </a>
                    <ul class="org-details">
                        <li>
                            <P class="col-title">机构编号</P>
                            <p>{{ nowSelect.sn || '--' }}</p>
                        </li>
                        <li>
                            <P class="col-title">机构类型</P>
                            <p>{{ getTypeText(nowSelect.type) }}</p>
                        </li>
                        <li>
                            <P class="col-title">机构名称</P>
                            <p>{{ nowSelect.name || '--' }}</p>
                        </li>
                        <li>
                            <P class="col-title">机构地址</P>
                            <p>{{ nowSelect.address || '--' }}</p>
                        </li>
                        <li>
                            <P class="col-title">法定代表人</P>
                            <p>{{ nowSelect.corporation || '--'  }}</p>
                        </li>
                        <li>
                            <P class="col-title">组织机构代码</P>
                            <p>{{ nowSelect.code || '--' }}</p>
                        </li>
                        <li>
                            <P class="col-title">营业执照号</P>
                            <p>{{ nowSelect.licenseSn || '--' }}</p>
                        </li>
                        <li>
                            <P class="col-title">所属区域</P>
                            <p>--</p>
                        </li>
                        <li>
                            <P class="col-title">联系人</P>
                            <p>{{ nowSelect.contact || '--'  }}</p>
                        </li>
                        <li>
                            <P class="col-title">联系人电话</P>
                            <p>{{ nowSelect.tel || '--' }}</p>
                        </li>
                        <li>
                            <P class="col-title">上级主管机构</P>
                            <p>--</p>
                        </li>
                        <li>
                            <P class="col-title">经度</P>
                            <p>{{ nowSelect.longitude || '--' }}</p>
                        </li>
                        <li>
                            <P class="col-title">纬度</P>
                            <p>{{ nowSelect.latitude || '--' }}</p>
                        </li>
                    </ul>
                </Card>
            </div>
        </div>
        <div v-show="data1.length <= 0" class="help-box">
            <p>暂无信息, 你可以</p>
            <Button @click="modal1 = true" style="display: block; height: 30px;" type="primary">创建根目录</Button>
        </div>
        <Modal 
            v-model="modal1"
            :title="update ? '更新组织' : '新建组织'"
        >
            <Form ref="form" :model="form" :rules="rule" :label-width="100">
                <FormItem label="机构编号">
                    <Input type="text" v-model="form.sn" />
                </FormItem>
                <FormItem prop="type" label="机构类型">
                    <Select v-model="form.type">
                        <Option v-for="(item, index) in typeList" :key="index" :value="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="name" label="机构名称">
                    <Input type='text' v-model="form.name"   />
                </FormItem>
                <FormItem label="机构地址">
                    <Input type='text' v-model="form.address"   />
                </FormItem>
                <FormItem label="法定代表人">
                    <Input type='text' v-model="form.corporation"   />
                </FormItem>
                <FormItem label="组织机构代码">
                    <Input type='text' v-model="form.code"   />
                </FormItem>
                <FormItem label="营业执照号">
                    <Input type='text' v-model="form.licenseSn"   />
                </FormItem>
                <FormItem prop="contact" label="联系人">
                    <Input type='text' v-model="form.contact"   />
                </FormItem>
                <FormItem prop="tel" label="联系人电话">
                    <Input type='text' v-model="form.tel"   />
                </FormItem>
                <FormItem label="上级主管机构">
                    <Input type='text'    />
                </FormItem>
                <FormItem label="经度">
                    <Input type='text' v-model="form.longitude"   />
                </FormItem>
                <FormItem label="纬度">
                    <Input type='text' v-model="form.latitude"   />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancelModal" type="ghost">取消</Button>
                <Button @click="addOrg('form')" type="primary" >确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import HeaderTitle from '@/components/HeaderTitle';
import OrgApi from '@/api/organization';
import Immutable from 'immutable';
import OrganizationTree from '@/components/OrganizationTree';

const initForm = Immutable.Map({
    sn: '',
    type: 1,
    name: '',
    address: '',
    corporation: '',
    code: '',
    licenseSn: '',
    contact: '',
    tel: '',
    longitude: '',
    latitude: '',
    parentId: '0'
});

export default {
    name: 'OrganozationList',
    data() {
        return {
            update: false,
            modal1: false,
            rule: {
                type: [
                    { required: true, type: 'number', message: '请选择机构类型', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请选择机构名称', trigger: 'blur' },
                ],
                contact: [
                    { required: true, message: '请输入联系人', trigger: 'blur' },
                ],
                tel: [
                    { required: true, message: '请输入联系人电话', trigger: 'blur' },
                ],
            },
            nowSelect: {},
            form: {
                sn: '',
                type: 1,
                name: '',
                address: '',
                corporation: '',
                code: '',
                licenseSn: '',
                contact: '',
                tel: '',
                longitude: '',
                latitude: '',
                parentId: '0'
            },
            typeList: [
                {
                    label: '监管管理部门',
                    value: 1
                },
                {
                    label: '市场',
                    value: 2
                },
                {
                    label: '超市',
                    value: 3
                },
                {
                    label: '个体',
                    value: 4
                },
                {
                    label: '其他检测机构',
                    value: 5
                },
            ],
            data1: []
        };
    },
    created() {

    },
    methods: {
        getTypeText(type) {
            let result = '';
            this.typeList.some((obj) => {
                if (type == obj.value) {
                    result = obj.label;
                    return true;
                }
            });
            return result;
        },
        editOrg() {
            this.modal1 = true;
            this.update = true;
            this.form = Immutable.Map(this.nowSelect).toObject();
        },
        async getNowDetails(id) {
            const res = await OrgApi.getOrgDetails(id);
            this.nowSelect = res.data.data;
        },
        loadTree(data) {
            this.data1 = Immutable.List(data).toArray();
        },
        async addOrg(name) {
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    let res;
                    if (this.update) {
                        this.form.id = this.nowSelect.id;
                        this.form.parentId = this.nowSelect.parentId;
                        res = await OrgApi.updateOrganization(this.form);
                        if (res.data.meta.code == 200) {
                            this.$Message.success('修改成功');
                        }
                    } else {
                        if (this.nowSelect.id) {
                            this.form.parentId = this.nowSelect.id.toString();
                        }
                        res = await OrgApi.addOrganization(this.form);
                        if (res.data.meta.code == 200) {
                            this.$Message.success('更新成功');
                        }
                    }
                    this.modal1 = false;
                    this.form = initForm.toObject();
                    this.$refs.orgTree.getList();
                }
            });
        },
        cancelModal() {
            this.form = initForm.toObject();
            this.modal1 = false;
        },
        selectTree(list) {
            if (list.length > 0) {
                this.getNowDetails(list[0].id);
            } else {
                this.form.parentId = 0;
                this.nowSelect = {};
            }
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

#organization-list{
    position: relative;
    .help-box{
        width: 100%;
        min-height: 280px;
        justify-content: center;
        margin-top: 100px;
        display: flex;
        position: relative;
        >p{
            margin: 10px;
            color: #333333;
        }
    }
    .org-details{
        >li{
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            .col-title{
                flex: 0 0 120px;
            }
            >P{
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
}
</style>

