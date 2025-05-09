import createAxios from "../model_axios";

const appAxios = createAxios({
    baseURL: 'https://open.bigmodel.cn/api/llm-application/open',
    token: '6231cbc29436d7eac2fa646059cbc1c1.vXHL1R0B40oP2ubh'
})

export const createApplication = async (data: any) => {
    const props = {
        name: '前端开发助手',
        desc: '你是一个拥有资深开发经验的前端工程师，且具有丰富的理论知识和实战经验可以帮助我解决前端开发中的问题',
        prompt: "从文档\n\"\"\"\n{{知识}}\n\"\"\"\n中找问题\n\"\"\"\n{{用户}}\n\"\"\"\n的答案，找到答案就仅使用文档语句回答问题，找不到答案就用自身知识回答并且告诉用户该信息不是来自文档。\n\n不要复述问题，直接开始回答。",
        model: '',
        knowledge_ids: [1919367676418019328, 1911318593623228416]
    }
    return await appAxios.post('/v2/application', props)
}