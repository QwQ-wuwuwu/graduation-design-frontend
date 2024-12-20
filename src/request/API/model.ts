import customAxios from "../common_axios";

export const createModel = async (data: any) => {
    let query = ''
    for(const key in data) {
        query += `${key}=${data[key]}&`
    }
    return await customAxios.post(`/model/create?${query}`)
}

export const getModelList = async () => {
    return await customAxios.get('/model/list')
}

export const getModelById = async (id: number) => {
    return await customAxios.get(`/model?id=${id}`)
}

export const updateModelById = async (id: number, model: any) => {
    return await customAxios.post(`/model/update`, {
        id,
        ...model
    })
}

export const deleteModelById = async (id: number) => {
    return await customAxios.delete(`/model/delete?id=${id}`)
}