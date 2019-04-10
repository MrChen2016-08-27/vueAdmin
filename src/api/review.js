import axios from './axios.config.js'
const base = '/review'

export const getReviewContentList = async (params) => {
    return axios({
        url: `${base}/content/list`,
        method: 'get',
        params
    })
}

export const getReviewContent = async (id) => {
    return axios({
        url: `${base}/content/get`,
        method: 'get',
        params: {
            id
        }
    });
}

export const addReviewContent = async (data) => {
    return axios({
        url: `${base}/content/add`,
        method: 'post',
        data
    });
}

export default {
    getReviewContentList,
    getReviewContent,
    addReviewContent
}
