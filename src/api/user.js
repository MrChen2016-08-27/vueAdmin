import axios from './axios.config.js'

export const getKey = params => {
    return axios({
        method: 'get',
        url: 'user/getKey',
        params
    })
}

export const login = data => {
    return axios({
        method: 'post',
        url: 'user/login',
        data
    })
}

// 获取用户列表
export const getUserList = data => {
    return axios({
        method: 'get',
        url: '/user/list',
        params: data
    })
}

// 获取用户
export const getUser = id => {
    return axios({
        method: 'get',
        url: '/user/get',
        params: { id }
    })
}

// 获取session当前用户
export const getTokenUser = () => {
    return axios({
        method: 'get',
        url: '/user/parse/token',
        params: {
            r: Date.now()
        }
    })
}

// 添加用户
export const addUser = data => {
    return axios({
        method: 'post',
        url: '/user/add',
        data
    })
}

// 修改用户
export const updateUser = data => {
    return axios({
        method: 'post',
        url: '/user/update',
        data
    })
}

// 后台修改用户
export const updateAdminUser = data => {
    return axios({
        method: 'post',
        url: '/user/admin/update',
        data
    })
}

// 修改用户
export const deleteUser = id => {
    return axios({
        method: 'post',
        url: '/user/delete',
        data: {
            id
        }
    })
}

// 注销用户
export const logout = () => {
    return axios({
        method: 'get',
        url: '/logout',
        params: {
            _: Date.now()
        }
    })
}

// 检查权限
export const getAuth = () => {
    return axios({
        method: 'get',
        url: '/auth',
        params: {
            _: Date.now()
        }
    })
}

export default {
    getKey,
    login,
    getUserList,
    getUser,
    addUser,
    updateUser,
    updateAdminUser,
    deleteUser,
    getAuth,
    logout,
    getTokenUser
}
