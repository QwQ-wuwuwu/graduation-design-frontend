import { User } from "@/types";
import customAxios from "../common_axios";

// 大模型接口创建的助手发送消息函数
export const send = async (chatInfo: any, msg: string) => {
    const user: User = JSON.parse(sessionStorage.getItem('user') as string);
    const data = {
        prompt:{ 'role': 'user', 'content': msg },
        assistantId: chatInfo.id,
        userId: user.id,
    }
    return await customAxios.post('/chat/init', data)
}

// 获取助手聊天历史记录
export const getMessageList = async (assistantId: number, userId: number) => {
    return await customAxios.get(`/chat/messagelist?assistantId=${assistantId}&userId=${userId}`);
}