import customAxios from '../common_axios'

export const registerApi = async (name:string, password:string) => {
    return await customAxios.post('/user/register', {
        name, password
    })
}

export const loginApi = async (name:string, password:string) => {
    return await customAxios.post('/user/login', {
        name, password
    })
}
