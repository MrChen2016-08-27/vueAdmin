import axios from './axios.config.js';

export const getOrganizationList = () => {
    return axios({
        url: 'org/list/get',
        method: 'get',
        params: {
            _: Date.now()
        }
    });
};

export const addOrganization = (data) => {
    return axios({
        url: 'org/add',
        data,
        method: 'post'
    });
}

export const updateOrganization = (data) => {
    return axios({
        url: 'org/update',
        data,
        method: 'post'
    });
}

export const getOrgDetails = (id) => {
    return axios({
        url: 'org/details',
        method: 'get',
        params: {
            id,
            _: Date.now()
        }
    });
}

export default {
    getOrganizationList,
    addOrganization,
    updateOrganization,
    getOrgDetails
};
