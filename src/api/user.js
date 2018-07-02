import axios from './axios.config.js';

export const getKey = (params) => {
    return axios({
        method: 'get',
        url: 'user/getKey',
        params
    })
}

export const login = (data) => {
    return axios({
        method: 'post',
        url: 'user/login',
        data
    });
}

// 获取用户列表
export const getUsers = (data) => {
    return axios({
        method: 'get',
        url: '/user/list/get/',
        params: data
    });
}

// 添加用户
export const addUser = (data) => {
    return axios({
        method: 'post',
        url: '/user/add',
        data
    });
}

// 注销用户
export const logout = () => {
    return axios({
        method: 'get',
        url: '/logout',
        params: {
            _: Date.now()
        }
    });
}

// 检查权限
export const getAuth = () => {
    return axios({
        method: 'get',
        url: '/auth',
        params: {
            _: Date.now()
        }
    });
}

export default {
    getKey,
    login,
    getUsers,
    addUser,
    getAuth,
    logout
}