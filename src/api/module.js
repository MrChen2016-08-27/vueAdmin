import axios from './axios.config.js'
const base = '/module'

// 获取栏目列表
export const getModuleList = async params => {
    return axios({
        url: `${base}/list`,
        method: 'get',
        params
    })
}

export const getModule = async id => {
    return axios({
        url: `${base}/get`,
        method: 'get',
        params: { id }
    })
}

export const addModule = async data => {
    return axios({
        url: `${base}/add`,
        method: 'post',
        data
    })
}

export const updateModule = async data => {
    return axios({
        url: `${base}/update`,
        method: 'post',
        data
    })
}

export const deleteModule = async id => {
    return axios({
        url: `${base}/delete`,
        method: 'post',
        data: {
            id
        }
    })
}

export default {
    getModuleList,
    getModule,
    addModule,
    updateModule,
    deleteModule
}
