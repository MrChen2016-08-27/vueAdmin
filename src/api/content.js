import axios from './axios.config.js'
const base = '/content'

// 获取栏目列表
export const getContentList = async params => {
    return axios({
        url: `${base}/list`,
        method: 'get',
        params
    })
}

export const getContent = async id => {
    return axios({
        url: `${base}/get`,
        method: 'get',
        params: { id }
    })
}

export const addContent = async data => {
    return axios({
        url: `${base}/add`,
        method: 'post',
        data
    })
}

export const updateContent = async data => {
    return axios({
        url: `${base}/update`,
        method: 'post',
        data
    })
}

export const deleteContent = async id => {
    return axios({
        url: `${base}/delete`,
        method: 'post',
        data: {
            id
        }
    })
}

// 获取栏目列表
export const getMyContentList = async params => {
    return axios({
        url: `${base}/my/list`,
        method: 'get',
        params
    })
}

export const getMyContent = async id => {
    return axios({
        url: `${base}/my/get`,
        method: 'get',
        params: { id }
    })
}

export const addMyContent = async data => {
    return axios({
        url: `${base}/my/add`,
        method: 'post',
        data
    })
}

export const updateMyContent = async data => {
    return axios({
        url: `${base}/my/update`,
        method: 'post',
        data
    })
}

export const deleteMyContent = async id => {
    return axios({
        url: `${base}/my/delete`,
        method: 'post',
        data: {
            id
        }
    })
}

export default {
    getContentList,
    getContent,
    addContent,
    updateContent,
    deleteContent,
    getMyContentList,
    getMyContent,
    addMyContent,
    updateMyContent,
    deleteMyContent
}
