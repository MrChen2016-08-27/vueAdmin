import axios from './axios.config.js';

export const getRoleList = async (params) => {
    return axios({
        url: '/test/role/list',
        method: 'get',
        params
    });
};

export default {
    getRoleList
}
