import { List } from 'immutable'
const app = {
    namespaced: true,
    state: {
        leftMenuList: []
    },
    mutations: {
        setLeftMenuList(state, list) {
            state.leftMenuList = List(list).toArray();
        }
    }
}

export default app;