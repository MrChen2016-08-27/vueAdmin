<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    // vue-router 兼容 ie
    if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) { // detect it's IE11
      window.addEventListener('hashchange', () => {
        var currentPath = window.location.hash.slice(1);
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath);
        }
      }, false);
    }
  },
}
</script>

<style lang='less'>
@import url('./styles/iView-cover.less');
@import url('./styles/common.less');
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html,
body {
    height: 100%;
    min-width: 1280px;
    font-size: 14px;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
#app {
    height: 100%;
    position: relative;
}
</style>
