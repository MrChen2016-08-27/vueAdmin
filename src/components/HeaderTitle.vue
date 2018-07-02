<template>
    <div class="header-title">
        <h3 class="title">
            <Icon style="marginRight: 5px" size="16" :type="this.icon" ></Icon>
            <slot></slot>
        </h3>
        <div>
            <slot name="rightContent" ></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        icon: {
            type: String,
            default: 'ios-pricetag'
        }
    }
}
</script>

<style lang="less" scoped>
    @import '../styles/index.less';
    .header-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        .title{
            font-size: 16px;
            padding-bottom: 5px;
            padding-right: 7px;
            background-color: @primary-color;
            color: #ffffff;
            padding: 5px 10px;
            border-radius: 5px;
            box-shadow: 3px 3px 2px 1px#E0E0E0;
        }
    }
</style>


