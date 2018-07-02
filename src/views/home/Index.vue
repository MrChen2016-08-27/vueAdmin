<template>
    <div id="home">
        <img class="logo" src="" />
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {};
    }
}
</script>

<style lang="less" scoped>
#home{
    display: flex;
    height: 100%;
    position: relative;
    background: url(../../assets/back.png) no-repeat;
    background-size: 100% 100%;
    justify-content: space-around;
    align-items: center;
    .logo{
        position: relative;
    }
}
</style>

