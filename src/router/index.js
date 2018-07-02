import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
const Login = () => import('@/views/login/Login');
const Home = () => import('@/views/home/Index');

const AuthorityList = () => import('@/views/systemManager/AuthorityList');
const AuthorityManager = () => import('@/views/systemManager/AuthorityManager');
const OrganizationList = () => import('@/views/systemManager/OrganizationList');
const UserList = () => import('@/views/systemManager/UserList');


Vue.use(Router)
// 不属于 Layout 子组件，作为根路由展示单独写
const loginRouter = {
    path: '/login',
    name: 'Login',
    component: Login
};

// 作为 Layout子组件但是不在左侧菜单里的路由
const otherRouter = [
    {
        path: '/home',
        name: 'Home',
        component: Layout,
        redirect: '/home/index',
        children: [
            {
                path: 'index',
                name: 'Home/Index',
                component: Home
            },
        ]
    },
];

// 作为 Layout子组件 展示, 并为左侧菜单显示的路由
export const appRouter = [
    {
        path: '/system',
        name: 'System',
        component: Layout,
        icon: 'clipboard',
        title: '系统管理',
        children: [
            {
                path: 'authorityList',
                name: 'System/AuthorityList',
                component: AuthorityList,
                title: '角色列表',
            },
            {
                path: 'authorityManager',
                name: 'System/AuthorityManager',
                component: AuthorityManager,
                title: '角色管理',
            },
            {
                path: 'organizationList',
                name: 'System/OrganizationList',
                component: OrganizationList,
                title: '组织架构',
            },
            {
                path: 'userList',
                name: 'System/UserList',
                component: UserList,
                title: '用户列表',
            },
        ],
    },
];

export const router =  new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        loginRouter,
        ...otherRouter,
        ...appRouter
    ]
});

