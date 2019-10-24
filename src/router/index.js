import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
const Login = () => import('@/views/login/Login')
const Home = () => import('@/views/home/Index')

const ContentReview = () => import('@/views/review/ContentReview')
const ContentReviewDetail = () => import('@/views/review/ContentReviewDetail')

const ContentList = () => import('@/views/content/ContentList')
const ContentDetail = () => import('@/views/content/ContentDetail')

const MyContent = () => import('@/views/content/MyContent')
const MyContentDetail = () => import('@/views/content/MyContentDetail')

const ModuleList = () => import('@/views/setting/ModuleList')
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
        path: '/review',
        component: Layout,
        icon: 'clipboard',
        title: '审核管理',
        children: [
            {
                path: 'contentDetail',
                name: 'Review/ContentDetail',
                component: ContentReviewDetail,
                title: '内容审核',
                meta: {
                    menuKey: 'Review'
                }
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
            },
            {
                path: 'myDetail',
                name: 'Content/MyDetail',
                component: MyContentDetail,
                title: '我的内容管理',
                meta: {
                    menuKey: 'MyContent'
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
        path: '/review',
        name: 'Review',
        component: Layout,
        icon: 'clipboard',
        title: '审核管理',
        id: '4',
        children: [
            {
                path: 'content',
                name: 'Review/ContentList',
                component: ContentReview,
                id: '1',
                title: '内容审核',
                meta: {
                    menuKey: 'Review'
                }
            }
        ]
    },
    {
        path: '/content',
        name: 'Content',
        component: Layout,
        icon: 'clipboard',
        title: '内容管理',
        id: '3',
        children: [
            {
                path: 'contentList',
                name: 'Content/ContentList',
                component: ContentList,
                title: '综合内容管理',
                id: '1',
                meta: {
                    menuKey: 'Content'
                }
            },
            {
                path: 'myContent',
                name: 'Content/MyContentList',
                component: MyContent,
                title: '我的内容管理',
                id: '2',
                meta: {
                    menuKey: 'MyContent'
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
        id: '2',
        children: [
            {
                path: 'moduleList',
                name: 'Setting/ModuleList',
                component: ModuleList,
                title: '模块设置',
                id: '1',
                meta: {
                    menuKey: 'Module'
                }
            },
            {
                path: 'columnList',
                name: 'Setting/ColumnList',
                component: ColumnList,
                title: '栏目设置',
                id: '2',
                meta: {
                    menuKey: 'Column'
                }
            },
            {
                path: 'typeList',
                name: 'Setting/TypeList',
                component: TypeList,
                title: '分类设置',
                id: '3',
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
        id: '1',
        children: [
            {
                path: 'roleList',
                name: 'System/RoleList',
                component: RoleList,
                title: '角色管理',
                id: '1',
                meta: {
                    menuKey: 'Role'
                }
            },
            {
                path: 'userList',
                name: 'System/UserList',
                component: UserList,
                id: '3',
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
