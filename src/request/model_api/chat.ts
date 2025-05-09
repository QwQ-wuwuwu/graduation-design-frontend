// import customAxios from '../minecraft_axios'

// export const getChatModel = async () => {
//     return await customAxios.get('/model_config')
// }

// export const chatWithModel = async (data: unknown) => {
//     return await customAxios.post('/completions', data)
// }

import zhipuAxios from "../model_axios";

export const chatWithZhiPuModel = (info: any, historyMsg: any[]) => {
    const data = {
        model: "glm-4-flash",
        messages: [
            { role: "system", content: info.portrait },
            { role: "user", content: "你好" },
            ...historyMsg
        ],
        stream: false
    }
    // return zhipuAxios.post(info.url, data);
}

import createAxios from "../model_axios";

// low 中之 low 的流式会话处理
export const chatWithModel = (info: any, historyMsg: any[], onStream: (text: string) => void) => {
    const curAxios = createAxios({
        token: info.token || info.api_key, 
        baseURL: info.url
    })
    const model = (info.model_name as string).toLowerCase()
    const data = {
        model,
        messages: [
            { "role": "system", "content": info.portrait },
            { "role": "user", "content": "你被我设定好的角色是什么，你能帮我解决哪些问题" },
            ...historyMsg
        ],
        stream: true
    }
    let buffer = '';
    let processedLength = 0;

    return curAxios({
        method: info.method,
        data,
        responseType: 'text',
        onDownloadProgress(progressEvent) {
            const chunk = progressEvent.event.target.responseText;
            const newData = chunk.slice(processedLength);
            processedLength = chunk.length;

            buffer += newData;
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            lines.forEach((line: string) => {
                if (line.startsWith('data: ')) {
                    const jsonStr = line.replace('data: ', '');
                    try {
                        const json = JSON.parse(jsonStr);
                        const content = json.choices?.[0]?.delta?.content;
                        if (typeof content === 'string') {
                            onStream(content);
                        }
                    } catch (e) {
                        console.error('Parse error:', jsonStr);
                    }
                }
            });
        }
    });
}

const chatAxios = createAxios({
    baseURL: 'https://open.bigmodel.cn/api/llm-application/open',
    token: '6231cbc29436d7eac2fa646059cbc1c1.vXHL1R0B40oP2ubh'
})

// 大模型接口创建的应用同步会话处理
export const chatWithApplication = () => {
    const app_id = '1919369230273437696'
    const prompt = [
        { 'role': 'user', 'content': '你是一个拥有丰富经验的前端工程师，帮助我解决前端开发工程中各种问题'},
        // { 'role': 'user', 'content': '你能帮我解决什么问题' }
    ]
    return chatAxios.post(`/model-api/1919369230273437696/invoke`, {
        prompt,
    })
}

// 测试使用的接口
export const initialChat = () => {
    const prompt = [
        { 'role': 'user', 'content': '你是一个拥有丰富经验的前端工程师，帮助我解决前端开发工程中各种问题'},
    ]
    return chatAxios.post('/model-api/1919369230273437696/sse-invoke', {
        prompt
    })
}

// 大模型接口创建的应用流式会话处理
export const chatWithApplicationSSE = () => {
    const prompt = [
        { 'role': 'user', 'content': '你是一个拥有丰富的前端开发经验的助手，且具有丰富的理论知识和实战经验可以帮助我解决前端开发中的问题' }
    ]
    return chatAxios.post(`/model-api/1919369230273437696/sse-invoke`, {
        prompt,
    })
}