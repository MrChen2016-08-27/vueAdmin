import { List } from 'immutable'
import { getRoleMenus, getTokenUser } from '@/api/user'
import { appRouter } from '@/router/index'
import _ from 'lodash/lang'

const app = {
    namespaced: true,
    state: {
        leftMenuList: []
    },
    mutations: {
        setLeftMenuList(state, list) {
            state.leftMenuList = _.cloneDeep(list)
        }
    },
    actions: {
        async filterLeftMenus({ state, commit, rootState }) {
            const list = [...state.leftMenuList]
            const res = await getTokenUser()
            const { menus } = res.data.data
            console.log(res.data.meta, 'res.data.meta')
            // if (!menus || res.data.meta.code != 200) {
            //     return
            // }
            const leftMenus = filterMenus(list, menus)

            commit('setLeftMenuList', leftMenus)
        }
    }
}

/**
 * @param { array } list 本地菜单
 * @param { array } menus 远程菜单
 *
 */
function filterMenus(list, menus) {
    const leftMenus = menus.map(item => {
        let nowObj = list.find(item2 => item.title == item2.title)
        if (!nowObj) {
            throw Error('服务端与本地路由配置不匹配')
        }
        if (item.children) {
            nowObj.children = filterMenus(nowObj.children, item.children)
        }
        return nowObj
    })
    return leftMenus
}

export default app
