import customAxios from '../minecraft_axios'

export const getChatModel = async () => {
    return await customAxios.get('/model_config')
}

export const chatWithModel = async (data: unknown) => {
    return await customAxios.post('/completions', data)
}