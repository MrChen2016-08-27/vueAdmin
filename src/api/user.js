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

// 获取session当前用户
export const getSessionUser = () => {
    return axios({
        method: 'get',
        url: '/user/session/',
        params: {
            r: Date.now()
        }
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

// 获取角色列表
export const getRoleList = async (params) => {
    return axios({
        url: '/user/role/list',
        method: 'get',
        params
    });
};

// 获取角色菜单
export const getRoleMenus = async (id) => {
    return axios({
        url: '/user/role/menus',
        method: 'get',
        params: {
            id
        }
    });
};

export default {
    getKey,
    login,
    getUsers,
    addUser,
    getAuth,
    logout,
    getSessionUser
}