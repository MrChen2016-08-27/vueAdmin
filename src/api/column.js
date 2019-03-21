import axios from './axios.config.js'
const base = '/column'

// 获取栏目列表
export const getColumnList = async params => {
    return axios({
        url: `${base}/list`,
        method: 'get',
        params
    })
}

export const getColumn = async id => {
    return axios({
        url: `${base}/get`,
        method: 'get',
        params: { id }
    })
}

export const addColumn = async data => {
    return axios({
        url: `${base}/add`,
        method: 'post',
        data
    })
}

export const updateColumn = async data => {
    return axios({
        url: `${base}/update`,
        method: 'post',
        data
    })
}

export const deleteColumn = async id => {
    return axios({
        url: `${base}/delete`,
        method: 'post',
        data: {
            id
        }
    })
}

export default {
    getColumnList,
    getColumn,
    addColumn,
    updateColumn,
    deleteColumn
}
