<style lang='less' scoped>
a{
    color: #666666;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
}
.layout-logo{
    position: absolute;
    display: flex;
    background: #126496;
    left: 0;
    top: 0;
    width: 220px;
    height: 84px;
    justify-content: center;
    align-items: center;
    >img{
        width: 58px;
    }
}
.project-title{
    position: relative;
    font-size: 28px;
    color: #ffffff;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.layout-nav{
    width: 330px;
    height: 84px;
    margin: 0 auto;
    position: absolute;
    top: 0px;
    right: 0px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.layout-center{
    height: 100%;
    overflow: hidden;
    position: relative;
    .left-slide{
        width: 220px;
        min-width: 220px;
        flex: 0 0 220px;
        overflow: hidden;
        position: relative;
        height: 100%;
        .layout-slide{
            background-color: #26364d;
            height: 100%;
            overflow-y: auto;
        }
    }
}
.badge-email{
    
}
.layout-content{
    padding: 15px;
    min-height: 280px;
    background: #fff;
    margin-top: 0px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}
.header-container{
    background-color: #0b78b9 !important;
    display: flex;
    height: 84px;
    justify-content: center;
    align-items: center;
}
</style>

<template>
    <div class="layout">
        <Layout :style="{ height: '100%' }">
            <Header style="padding: 0 0px; background-color: #0b78b9;">
                <Menu class="header-container"  mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <img src=""  />
                    </div>
                    <div class="project-title">标题</div>
                    <div class="layout-nav">
                        <!-- <MenuItem name="1">
                            总览
                        </MenuItem>
                        <MenuItem name="2">
                            <Badge class="badge-email" count="100" overflow-count="99">
                               <Icon type="ios-email-outline" size="30"></Icon>
                            </Badge>
                        </MenuItem> -->
                        <MenuItem name="1">
                            <Dropdown trigger="click">
                                <a style="color: #fff" href="javascript:void(0)">
                                    欢迎您， {{ getUserName }}
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem @click.native="logout">注销</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout class="layout-center" >
                <div class="left-slide">
                    <Sider hide-trigger class="layout-slide" :width="240">
                    <Menu  :active-name="activeName" theme="dark" width="auto" :open-names="oepnNames">
                        <Submenu v-for="(item, index) in leftMenuList" :name="item.name" :key="index">
                            <template slot="title">
                                <Icon :type="item.icon"></Icon>
                                {{ item.title }}
                            </template>
                            <router-link
                                v-for="(child, index2) in item.children"
                                :key="index2"
                                :to="`${item.path}/${child.path}`"
                            >
                                <MenuItem
                                    :name="child.meta.menuKey"
                                >
                                    {{ child.title }}
                                </MenuItem>
                            </router-link>
                        </Submenu>
                    </Menu>
                    </Sider>
                </div>
                <Layout :style="isHome ? '' : 'padding: 5px;'">
                    <!-- <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb> -->
                    <Content class="layout-content" :style="isHome ? 'padding: 0px;' : ''" >
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex';
    import userApi from '@/api/user';
    import { router } from '@/router';

    export default {
        data() {
            return {

            }
        },
        created() {
            
        },
        mounted() {
            console.log(this.$store.state.app.leftMenuList);
        },
        computed: {
            ...mapState({
                leftMenuList: state => state.app.leftMenuList,
                username: state => state.user.username
            }),
            ...mapGetters({
                getUserName: 'user/getUserName'
            }),
            isHome() {
                let name = this.$route.name;
                if (name == 'Home/Index') {
                    return true;
                } else {
                    return false;
                }
            },
            activeName() {
                let info = this.$route.matched.find((item) => {
                    return item.meta.menuKey;
                });
                if (info) {
                    return info.meta.menuKey;
                }
                return;
            },
            oepnNames() {
                return this.$route.name.split("/");
            }
        },
        methods: {
            async logout() {
                const res = await userApi.logout();
                if (res.data.meta.code == 200) {
                    // 清除用户名
                    localStorage.removeItem('inspec_username');
                    this.$router.push('/login');
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            
            userApi.getAuth()
                .then((res) => {
                    router.app.$store.dispatch('app/filterLeftMenus').then(() => next());
                    // appStore.actions.filterLeftMenus(store).then(() => {
                    //     next();
                    // });
                })
        }
    }
</script>
