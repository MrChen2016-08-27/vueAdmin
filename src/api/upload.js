import axios from './axios.config.js'
const base = '/upload'

// 获取栏目列表
export const uploadImgAction = `${axios.defaults.baseURL}${base}/img`
export const uploadFileAction = `${axios.defaults.baseURL}${base}/file`
