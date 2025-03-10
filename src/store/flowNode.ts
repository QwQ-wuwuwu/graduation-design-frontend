import { create, StoreApi, UseBoundStore } from "zustand";

type Assistant = {
    id?: number,
    name?: string,
    avatar?: string,
    description?: string,
    user_name?: string,
    user_id?: number,
    portrait?: string,
    api_id?: number,
    model_id?: number,
    temperature?: number,
    max_token?: number,
    knowledge_ids?: string,
    guide_word?: string,
    on_off?: number,
    insert_time?: string,
    update_time?: string
}

export const useModelTask = create(set => ({
    modelId: -1,
    setModel: (id: number) => { set({ modelId: id }) }
}))

type AssistantStore = {
    assistant: Assistant,
    setAssistant: (obj: Assistant) => void
}

// 用于构建流程信息收集
export const useAssistant: UseBoundStore<StoreApi<AssistantStore>> = create(set => ({
    assistant: {},
    setAssistant: (obj: Assistant) => { set({ assistant: obj }) }
}))