import axios from 'axios';
import Vue from 'vue';
import router from '@/router';
import { Notice } from 'iview';
Vue.component(Notice);

const baseUrl = process.env.NODE_ENV === 'production' ? '' : '/api/';

axios.defaults.baseURL = baseUrl ;

axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = localStorage.getItem('token');
        }
        return config;
    },
    err => {
        return Promise.reject(err);
});

axios.interceptors.response.use((response) => {
    const { data } = response;
    if (data.meta.code != 200) {
        new Vue().$Notice.error({
            title: data.meta.message
        });
    }
    if (data.data && data.data.token) {
        localStorage.setItem('token', `Bearer ${data.data.token}`);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
    }
    return response;
}, (error) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                router.push('/login');
                if (localStorage.getItem('token')) {
                    localStorage.removeItem('token');
                    new Vue().$Notice.warn({
                        title: '用户信息已经过期',
                        desc: '请重新登录'
                    });
                } else {
                    new Vue().$Notice.warn({
                        title: '请先登录'
                    });
                }
                axios.defaults.headers.common['Authorization'] = '';
                break;
            default:
                break;
        }
    }
});

export default axios;