<template>
    <div id="authority-manager" >
        <header-title icon="android-lock" >权限管理</header-title>
        <div class="manager-container">
            <Card v-for="(item, index) in form" class="card" :key="index" >
                <p slot="title">{{ item.title }}</p>
                <div v-for="(child, index2) in item.childs" :key="index2" class="content">
                    <div class="column">
                        <label>模块1</label>
                        <Checkbox
                            v-for="(opt, index3) in options"
                            :key="index3"
                            :value="parseIsCheckOut(child.value, index3)"
                        >
                            {{ opt }}
                        </Checkbox>
                    </div>
                </div>
            </Card>
        </div>

    </div>
</template>

<script>
import HeaderTitle from '@/components/HeaderTitle';

export default {
    name: 'AuthorityManager',
    data() {
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
            ]
        };
    },
    components: {
        HeaderTitle
    },
    mounted() {

    },
    methods: {
        changeCheck(value) {

        },
        /** 对数据进行二进制向右移位操作，判断是否选中 */
        /** @param value -> 数据, number -> 移位数 */
        parseIsCheckOut(value, number) {
            return true;
        }
    }
}
</script>

<style lang="less" scoped>
.manager-container{
    display: flex;
    flex-wrap: wrap;
    .card{
        flex: 0 0 360px;
        margin: 10px;
        .content{
            .column{
                display: flex;
                justify-content: space-around;
                margin: 5px 0;
            }
        }
    }
}
</style>


