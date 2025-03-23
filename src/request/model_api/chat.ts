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