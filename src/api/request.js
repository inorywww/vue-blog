import axios from 'axios';
// 创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:3000/', // api的base_url
    withCredentials: true, // 跨域请求时是否发送cookies
    timeout: 5000 // 请求超时设置
})

// 请求拦截器
service.interceptors.request.use(config => {
    // 请求前做点什么？
    if (!config.data) {
        config.data = {};
    }

    // 设置公共参数
    return config;
}, error => {
    // 处理请求错误
    console.log('error',error); // 用于调试
    return Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use(response => {
    return response;
}, error => {
    console.log('error：' + error); // 用于调试
    return Promise.reject(error);
})

export default service;
