import axios from './axios.config.js'
const base = '/role'

// 获取角色列表
export const getRoleList = async params => {
    return axios({
        url: `${base}/list`,
        method: 'get',
        params
    })
}

// 删除指定角色
export const deleteRole = async id => {
    return axios({
        url: `${base}/delete`,
        method: 'post',
        data: {
            id
        }
    })
}

// 添加角色
export const addRole = async data => {
    return axios({
        url: `${base}/add`,
        method: 'post',
        data
    })
}

// 编辑角色
export const updateRole = async data => {
    return axios({
        url: `${base}/update`,
        method: 'post',
        data
    })
}

export const getRole = async id => {
    return axios({
        url: `${base}/get`,
        method: 'get',
        params: {
            id
        }
    })
}

export const getAllMenus = async () => {
    return axios({
        url: `${base}/all/menus`,
        method: 'get'
    })
}

export default {
    getRoleList,
    deleteRole,
    addRole,
    getRole,
    getAllMenus
}
