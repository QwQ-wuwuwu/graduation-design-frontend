import axios from 'axios';

const customAxios = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
})

customAxios.interceptors.request.use((config) => { 
    const token = sessionStorage.getItem('token')
    token && config.headers.set('Authorization', `Bearer ${token}`)
    return config
}, (error) => {
    return Promise.reject(error)
})

customAxios.interceptors.response.use((config) => {
    if(config.status === 401) {
        // @ts-ignore
        location.href = __APP_ENV__.BASE_URL + '/'
        return Promise.reject('没有权限信息')
    }
    if(config.status === 500) {
        return Promise.reject('服务器错误')
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

export default customAxios