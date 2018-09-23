import axios from 'axios';
import Vue from 'vue';
import { router } from '@/router';
import { Notice } from 'iview';
Vue.prototype.$Notice = Notice;
const baseUrl = process.env.NODE_ENV === 'production' ? '/api/' : '/api/';

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
    }
);

axios.interceptors.response.use((response) => {
    const { data } = response;
    // 拦截业务异常
    if (data.meta.code != 200) {
        new Vue().$Notice.error({
            title: data.meta.message
        });
        return;
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
                    // 清除 token
                    localStorage.removeItem('token');
                    // 清除用户名
                    localStorage.removeItem('inspec_username');
                    new Vue().$Notice.warning({
                        title: '用户信息已经过期',
                        desc: '请重新登录'
                    });
                } else {
                    new Vue().$Notice.warning({
                        title: '请先登录'
                    });
                }
                axios.defaults.headers.common['Authorization'] = '';
                break;
            case 504:
                new Vue().$Notice.warning({
                    title: '服务器超时'
                });
                break;
            default:
                break;
        }
    }
    return Promise.reject(error.response.status);
});

export default axios;