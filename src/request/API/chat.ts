import customAxios from "../common_axios";

// 大模型接口创建的助手发送消息函数
export const send = async (data: any) => {
    data.api_key = '7e8ccaf56ec747e0a15504d1091deb1d.ehUDl9cEUUcWIoit'
    data.prompt = [
        { 'role': 'user', 'content': '你是一个拥有丰富的前端开发经验的助手，且具有丰富的理论知识和实战经验可以帮助我解决前端开发中的问题' },
        { 'role': 'assistant', 'content': `好的，明白，我会坚决按照你的要求来回答你的问题` },
        { 'role': 'user', 'content': '你能做什么？' },
    ]
    data.app_id = '1919369230273437696'
    return await customAxios.post('/chat/init', data)
}