import customAxios from "../common_axios";

export const createAPI = async (data: any) => {
    return await customAxios.post(`/url/create`, data)
}

export const getAPIList = async () => {
    return await customAxios.get('/url/list')
}

export const deleteAPI = async (id: number) => {
    return await customAxios.delete(`/url/delete?id=${id}`)
}

export const getAPIById = async (id: number) => {
    return await customAxios.get(`/url?id=${id}`)
}

export const updateAPI = async (id: number, data: any) => {
    return await customAxios.post('/url/update', {
        id,
        ...data
    })
}