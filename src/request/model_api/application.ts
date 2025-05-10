import createAxios from "../model_axios";
import { getKnowledgeIds } from "../API/knowledge";

const appAxios = createAxios({
    baseURL: 'https://open.bigmodel.cn/api/llm-application/open',
    token: '6231cbc29436d7eac2fa646059cbc1c1.vXHL1R0B40oP2ubh'
})

export const createApplication = async (assistant: any) => {
    let knowledge_ids = []
    if (assistant.knowledge_ids) {
        const ids = assistant.knowledge_ids.split(',').map((d: any) => Number(d))
        const { data: { data } } = await getKnowledgeIds(ids)
        knowledge_ids = data.map((d: any) => d.knowledge_id)
    }
    const props = {
        name: assistant.name,
        desc: assistant.description,
        model: assistant.model_name,
        prompt: "从文档\n\"\"\"\n{{知识}}\n\"\"\"\n中找问题\n\"\"\"\n{{用户}}\n\"\"\"\n的答案，找到答案就仅使用文档语句回答问题，找不到答案就用自身知识回答并且告诉用户该信息不是来自文档。\n\n不要复述问题，直接开始回答。",
        knowledge_ids,
        temperature: assistant.temperature,
        param_desc: assistant.param_desc,
        max_token: assistant.max_token
    }
    return await appAxios.post('/application', props)
}