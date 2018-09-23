import { List } from 'immutable';
import { getRoleMenus, getSessionUser } from '@/api/user';
import { appRouter } from '@/router/index';

const app = {
    namespaced: true,
    state: {
        leftMenuList: []
    },
    mutations: {
        setLeftMenuList (state, list) {
            state.leftMenuList = [...list];
        }
    },
    actions: {
        async filterLeftMenus ({ state, commit, rootState }) {
            const list = [...state.leftMenuList];
            const res = await getSessionUser();
            const { menus } = res.data.data;
            if (!menus || res.data.meta.code != 200) {
                return;
            }
            const leftMenus = filterMenus(list, menus);

            commit('setLeftMenuList', leftMenus);
        }
    }
}

/**
 * @param { array } list 本地菜单
 * @param { array } menus 远程菜单
 * 
 */
function filterMenus (list, menus) {
    const leftMenus = menus.map((item) => {
        let nowObj = list.find(item2 => item.title == item2.title);
        if (item.children) {
            nowObj.children = filterMenus(nowObj.children, item.children);
        }
        return nowObj;
    });
    return leftMenus;
}

export default app;