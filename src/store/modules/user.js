const user = {
    namespaced: true,
    state: {
        username: '未登陆'
    },
    mutations: {
        setUserName(state, username) {
            localStorage.setItem('inspec_username', username);
            state.username = localStorage.getItem('inspec_username');
        }
    },
    getters: {
        getUserName: state => localStorage.getItem('inspec_username') || state.username
    }
}

export default user;