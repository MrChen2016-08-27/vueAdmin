import axios from 'axios'
import Vue from 'vue'
import { router } from '@/router'
import { Notice } from 'iview'
Vue.prototype.$Notice = Notice
const baseUrl = process.env.NODE_ENV === 'production' ? '/api/' : '/api/'

axios.defaults.baseURL = baseUrl

axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = localStorage.getItem('token')
        } else {
            config.headers.Authorization = ''
        }

        return config
    },
    err => {
        console.log('promise reject..')
        return Promise.reject(err)
    }
)

axios.interceptors.response.use(
    response => {
        const { data } = response
        // 拦截业务异常
        if (data.meta.code != 200) {
            new Vue().$Notice.error({
                title: data.meta.message
            })
            throw Error(data.meta.message)
            return
        }
        if (data.data && data.data.token) {
            localStorage.setItem('token', `Bearer ${data.data.token}`)
            axios.defaults.headers.common['Authorization'] = `Bearer ${
                data.data.token
            }`
        }
        return response
    },
    error => {
        let errMsg = '请求错误'
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    router.replace('/login')
                    errMsg = 'request 401'
                    if (localStorage.getItem('token')) {
                        // 清除 token
                        localStorage.clear()
                        new Vue().$Notice.warning({
                            title: '用户信息已经过期',
                            desc: '请重新登录'
                        })
                    } else {
                        new Vue().$Notice.warning({
                            title: '请先登录'
                        })
                    }
                    axios.defaults.headers.common['Authorization'] = ''
                    break
                case 504:
                    errMsg = 'request 504'
                    new Vue().$Notice.warning({
                        title: '服务器超时'
                    })
                    break
                case 404:
                    errMsg = 'request 404'
                    break
                default:
                    break
            }
        }
        return Promise.reject(errMsg)
    }
)

export default axios
