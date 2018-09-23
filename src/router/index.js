import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
const Login = () => import('@/views/login/Login');
const Home = () => import('@/views/home/Index');

const RoleList = () => import('@/views/systemManager/RoleList');
const AuthorityManager = () => import('@/views/systemManager/AuthManager');
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
    {
        path: '/system',
        name: 'System',
        component: Layout,
        icon: 'clipboard',
        title: '系统管理',
        children: [
            {
                path: 'authorityManager',
                name: 'System/AuthorityManager',
                component: AuthorityManager,
                title: '角色权限管理',
                meta: {
                    menuKey: 'Role',
                },
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
                path: 'RoleList',
                name: 'System/RoleList',
                component: RoleList,
                title: '角色列表',
                meta: {
                    menuKey: 'Role', 
                },
            },
            {
                path: 'organizationList',
                name: 'System/OrganizationList',
                component: OrganizationList,
                title: '组织架构',
                meta: {
                    menuKey: 'Organization',
                },
            },
            {
                path: 'userList',
                name: 'System/UserList',
                component: UserList,
                title: '用户列表',
                meta: {
                    menuKey: 'User',
                },
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

