import axios from 'axios';
import { toast } from '@/hooks/use-toast';

const customAxios = axios.create({
    // @ts-ignore
    baseURL: __APP_ENV__.BASE_URL + '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 3000,
})

customAxios.interceptors.request.use((config) => { 
    const token = sessionStorage.getItem('token')
    token && config.headers.set('Authorization', `Bearer ${token}`)
    return config
}, (error) => {
    toast({ title: 'Error！', description: error, variant: 'destructive' })
    return Promise.reject(error)
})

customAxios.interceptors.response.use((config) => {
    // if(config.status === 400) return config
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
    toast({ title: 'Error！', description: '服务器异常，请稍后再试', variant: 'destructive' })
    return Promise.reject(error)
})

export default customAxios