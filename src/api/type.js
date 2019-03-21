import axios from './axios.config.js'
const base = '/type'

// 获取栏目列表
export const getTypeList = async params => {
    return axios({
        url: `${base}/list`,
        method: 'get',
        params
    })
}

export const getType = async id => {
    return axios({
        url: `${base}/get`,
        method: 'get',
        params: { id }
    })
}

export const addType = async data => {
    return axios({
        url: `${base}/add`,
        method: 'post',
        data
    })
}

export const updateType = async data => {
    return axios({
        url: `${base}/update`,
        method: 'post',
        data
    })
}

export const deleteType = async id => {
    return axios({
        url: `${base}/delete`,
        method: 'post',
        data: {
            id
        }
    })
}

export default {
    getTypeList,
    getType,
    addType,
    updateType,
    deleteType
}
