import createAxios from "../model_axios"

type DataInfo = {
    name: string,
    description?: string
}

const modelAxios = createAxios({
    baseURL: "https://open.bigmodel.cn/api/llm-application/open",
    token: '6231cbc29436d7eac2fa646059cbc1c1.vXHL1R0B40oP2ubh'
})

// 依赖于智谱大模型接口构建知识库
export const createKnowledgeApi = async (data: DataInfo) => {
    const embedding_id = 1; // 向量模型暂定为1
    return await modelAxios.post('/knowledge', {
        embedding_id,
        name: data.name,
        description: data.description || '',
    })
}