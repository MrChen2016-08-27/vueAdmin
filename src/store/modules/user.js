const user = {
    namespaced: true,
    state: {
        username: null
    },
    mutations: {
        setUserName(state, username) {
            localStorage.setItem('inspec_username', username)
            state.username = localStorage.getItem('inspec_username')
        }
    },
    getters: {
        getUserName: state => {
            let username =
                state.username || localStorage.getItem('inspec_username')
            if (username) {
                return username
            } else {
                return '未登录'
            }
        }
    }
}

export default user
