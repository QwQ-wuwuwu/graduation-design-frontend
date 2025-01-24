import { create } from "zustand";
import { getDocKnowledgeList, getQAKnowledgeList } from "@/request/API/knowledge";
import { User } from "@/types";

type Knowledge = {
    id: number,
    type: number,
    name: string,
    model_id: number,
    model_name: string,
    description: string,
    user_name: string,
    user_id: number,
    insert_time: string,
    update_time: string
}

const user: User = JSON.parse(sessionStorage.getItem('user') as string)

export const useDocKnowledgeStore = create((set) => ({
    docList: [],
    docFiles: [],
    setDocList: (list:Knowledge[]) => { set({ docList:list }) },
    loadDocList: async () => {
        const { data: { data } } = await getDocKnowledgeList(user.id)
        set({ docList: data })
    }
}))

export const useQAKnowledgeStore = create(set => ({
    qaList: [],
    qaLibs: [], // QA内容
    setQAList: (list:Knowledge[]) => { set({ docList:list }) },
    loadQAList: async () => {
        const { data: { data } } = await getQAKnowledgeList(user.id)
        set({ qaList: data })
    }
}))

export const useKnowDetailStore = create(set => ({
    knowledge: {},
    setKnowledge: (knowledge:Knowledge) => { set({ knowledge }) }
}))