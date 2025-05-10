import customAxios from "../common_axios";
import type { User } from "@/types";
import { createApplication } from "../model_api/application";

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
    let application_id = data.application_id
    // 暂定，如果没有 app_id 就创建
    if (!data.application_id) {
        const res = await createApplication(data)
        application_id = res.data.data
    }
    return await customAxios.post('/assistant/update', {
        ...data,
        user_id: user.id,
        user_name: user.name,
        on_off: online,
        application_id
    })
}

// 获取助手详情
export const getAssistant = async (id: string) => {
    return customAxios.get(`/assistant/detail?id=${id}`)
}

// 首页助手
export const getOnlineAssistants = async () => {
    return customAxios.get(`/assistant/list?user_id=${user.id}`)
}

// 构建页助手
export const getAssistants = async () => {
    return customAxios.get(`/assistant/build_list?user_id=${user.id}`)
}

// 获取助手聊天信息
export const getAssistantChat = async (id: number) => {
    return customAxios.get(`/assistant/chat?id=${id}`)
}