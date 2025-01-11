import customAxios from "../common_axios";

export const createTask = async (data: any) => {
    return await customAxios.post(`/task/create`, data)
}

export const getTaskList = async () => {
    return await customAxios.get('/task/list')
}

export const getTaskById = async (id: number) => {
    return await customAxios.get(`/task?id=${id}`)
}

export const updateTaskById = async (id: number, data: any) => {
    return await customAxios.post('/task/update', { id, ...data })
}

export const deleteTaskById = async (id: number) => {
    return await customAxios.delete(`/task/delete?id=${id}`)
}

// 后期优化为分页查询
export const searchByName = async (name: string) => {
    return await customAxios.get(`/task/search?name=${name}`)
}