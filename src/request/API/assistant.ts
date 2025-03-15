import customAxios from "../common_axios";
import type { User } from "@/types";

const user: User = JSON.parse(sessionStorage.getItem('user') as string)

// 创建助手
export const createAssistant = async (data:any) => {
    return customAxios.post('/assistant/create', {
        ...data,
        user_id: user.id,
        user_name: user.name
    })
}

// 保存或上线助手
export const updateAssistant = async (online = 0, data: any) => {
    return await customAxios.post('/assistant/update', {
        ...data,
        user_id: user.id,
        user_name: user.name,
        on_off: online
    })
}

// 首页助手
export const getOnlineAssistants = async () => {
    return customAxios.get(`/assistant/list?user_id=${user.id}`)
}

// 构建页助手
export const getAssistants = async () => {
    return customAxios.get(`/assistant/build_list?user_id=${user.id}`)
}