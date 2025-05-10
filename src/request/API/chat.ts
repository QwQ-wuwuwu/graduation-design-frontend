import customAxios from "../common_axios";

const modelToken = '7e8ccaf56ec747e0a15504d1091deb1d.ehUDl9cEUUcWIoit';
// 大模型接口创建的助手发送消息函数
export const send = async (data: any, msg: string) => {
    data.api_key = modelToken
    data.prompt = [
        { 'role': 'user', 'content': msg }
    ]
    return await customAxios.post('/chat/init', data)
}