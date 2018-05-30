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