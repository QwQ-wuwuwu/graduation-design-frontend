import customAxios from "../common_axios";

export const createAPI = async (data: any) => {
    let query = ''
    for(const key in data) {
        query += `${key}=${data[key]}&`
    }
    return await customAxios.post(`/api/create?${query}`)
}