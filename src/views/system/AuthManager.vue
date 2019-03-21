<template>
    <div id="authority-manager">
        <header-title icon="android-lock">权限管理</header-title>
        <div class="manager-container">
            <Card v-for="(item, index) in menus" class="card" :key="index">
                <p slot="title">{{ item.title }}</p>
                <div v-for="(child, index2) in item.children" :key="index2" class="content">
                    <div class="column">
                        <label>{{ child.title }}</label>
                        <template v-for="(opt, index3) in options">
                            <Checkbox v-if="authority[item.id]" :key="index3" :value="parseIsCheckOut(authority[item.id][child.id], index3)" @on-change="(result) => changeCheck(item.id, child.id, index3, result)">
                                {{ opt }}
                            </Checkbox>
                            <Checkbox v-else :key="index3" :value="parseIsCheckOut(0, index3)" @on-change="(result) => changeCheck(item.id, child.id, index3, result)">
                                {{ opt }}
                            </Checkbox>
                        </template>
                    </div>
                </div>
            </Card>
        </div>
        <div class="page-action-footer">
            <Button @click="saveChange()" class="save-btn" type="primary">保存</Button>
        </div>
    </div>
</template>

<script>
import HeaderTitle from '@/components/HeaderTitle';
import { updateRole, getRole, getAllMenus } from '@/api/role';
// import { getRoleMenus } from '@/api/user';
export default {
    name: 'AuthorityManager',
    data () {
        return {
            options: ['新增', '删除', '编辑', '查看'],
            form: [
                {
                    title: '模块1',
                    childs: [
                        {
                            name: '',
                            value: 64,
                        }
                    ]
                }
            ],
            authority: {},
            menus: []
        };
    },
    components: {
        HeaderTitle
    },
    mounted () {

    },
    created () {
        this.init();
    },
    methods: {
        async init () {
            let id = this.$route.params.id;
            let { data } = await getRole(id);
            this.authority = data.data.authority;
            let menuRes = await getAllMenus();
            this.menus = menuRes.data.data.appRouter;
        },
        // parsechecksResult () {
        //     let checksResult = {};
        //     for (let key in this.authority) {
        //         checksResult[key] = {};
        //         for (let key2 in this.authority[key]) {
        //              checksResult[key][key2] = {};
        //             let result = this.authority[key][key2];
        //             for (let i = 0; i < this.options; i++) {
        //                 checksResult[key][key2]
        //             }
        //         }
        //     }
        // }, 
        changeCheck (pId, cId, num, value) {
            let result = 0;
            if (!this.authority[pId]) {
                this.authority[pId] = {};
            } else if (this.authority[pId][cId]) {
                result = Number(this.authority[pId][cId]);
            }
            let val = Math.pow(2, num);
            if (value) {
                this.authority[pId][cId] = result + val;
                this.$set(this.authority[pId], cId, this.authority[pId][cId])
            } else {
                this.authority[pId][cId] = result +- val;
                this.$set(this.authority[pId], cId, this.authority[pId][cId])
            }
            console.log('authority', this.authority);
        },
        /** 对数据进行二进制向右移位操作，判断是否选中 */
        /** @param value -> 数据, number -> 移位数 */
        parseIsCheckOut (value = 0, number) {
            let a = 1 << number;
            return value & a ? true : false;
        },
        async saveChange () {
            let form = {
                id: this.$route.params.id,
                authority: this.authority
            };
            await updateRole(form);
            this.$router.push({ name: 'System/RoleList' });
            this.$Notice.success({
                title: '保存成功',
                duration: 2,
            });
        }
    }
}
</script>

<style lang="less" scoped>
.manager-container {
    display: flex;
    flex-wrap: wrap;
    .card {
        flex: 0 0 360px;
        margin: 10px;
        .content {
            .column {
                display: flex;
                justify-content: space-around;
                margin: 5px 0;
            }
        }
    }
}
</style>


