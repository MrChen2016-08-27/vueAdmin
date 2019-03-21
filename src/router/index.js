import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
const Login = () => import('@/views/login/Login')
const Home = () => import('@/views/home/Index')

const ContentList = () => import('@/views/content/ContentList')
const ContentDetail = () => import('@/views/content/ContentDetail')

const ColumnList = () => import('@/views/setting/ColumnList')
const TypeList = () => import('@/views/setting/TypeList')

const RoleList = () => import('@/views/system/RoleList')
const AuthorityManager = () => import('@/views/system/AuthManager')
const UserList = () => import('@/views/system/UserList')

Vue.use(Router)
// 不属于 Layout 子组件，作为根路由展示单独写
const loginRouter = {
    path: '/login',
    name: 'Login',
    component: Login
}

// 作为 Layout子组件但是不在左侧菜单里的路由
const otherRouter = [
    {
        path: '/home',
        component: Layout,
        redirect: '/home/index',
        children: [
            {
                path: 'index',
                name: 'Home/Index',
                component: Home
            }
        ]
    },
    {
        path: '/content',
        component: Layout,
        icon: 'clipboard',
        title: '内容管理',
        children: [
            {
                path: 'detail',
                name: 'Content/Detail',
                component: ContentDetail,
                title: '综合内容管理',
                meta: {
                    menuKey: 'Content'
                }
            }
        ]
    },
    {
        path: '/system',
        component: Layout,
        icon: 'clipboard',
        title: '系统管理',
        children: [
            {
                path: 'authorityManager/:id',
                name: 'System/AuthorityManager',
                component: AuthorityManager,
                title: '角色权限管理',
                meta: {
                    menuKey: 'Role'
                }
            }
        ]
    },
    {
        path: '/setting',
        component: Layout,
        icon: 'clipboard',
        title: '基本设置',
        children: [
            {
                path: 'typeList/:columnId',
                name: 'Setting/ColumnTypeList',
                component: TypeList,
                title: '子分类设置',
                props: true,
                meta: {
                    menuKey: 'Column'
                }
            }
        ]
    }
]

// 作为 Layout子组件 展示, 并为左侧菜单显示的路由
export const appRouter = [
    {
        path: '/content',
        name: 'Content',
        component: Layout,
        icon: 'clipboard',
        title: '内容管理',
        children: [
            {
                path: 'contentList',
                name: 'Content/ContentList',
                component: ContentList,
                title: '综合内容管理',
                meta: {
                    menuKey: 'Content'
                }
            }
        ]
    },
    {
        path: '/setting',
        name: 'Setting',
        component: Layout,
        icon: 'clipboard',
        title: '基本设置',
        children: [
            {
                path: 'columnList',
                name: 'Setting/ColumnList',
                component: ColumnList,
                title: '栏目设置',
                meta: {
                    menuKey: 'Column'
                }
            },
            {
                path: 'typeList',
                name: 'Setting/TypeList',
                component: TypeList,
                title: '分类设置',
                props: true,
                meta: {
                    menuKey: 'Type'
                }
            }
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
                path: 'roleList',
                name: 'System/RoleList',
                component: RoleList,
                title: '角色管理',
                meta: {
                    menuKey: 'Role'
                }
            },
            {
                path: 'userList',
                name: 'System/UserList',
                component: UserList,
                title: '用户管理',
                meta: {
                    menuKey: 'User'
                }
            }
        ]
    }
]

export const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        loginRouter,
        ...otherRouter,
        ...appRouter
    ]
})
