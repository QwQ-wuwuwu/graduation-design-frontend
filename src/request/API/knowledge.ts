import customAxios from "../common_axios";

export const createDocKnowledge = async (data: any) => {
    return await customAxios.post(`/knowledge/create`, {...data, type: 0})
}

export const createQAKnowledge = async (data: any) => {
    return await customAxios.post(`/knowledge/create`, {...data, type: 1})
}

export const getDocKnowledgeList = async (user_id: number) => {
    return await customAxios.get(`/knowledge/list?type=0&user_id=${user_id}`, {
    })
}

export const getList = async () => {
    return await customAxios.get('/knowledge/slist')
}

export const getQAKnowledgeList = async (user_id: number) => {
    return await customAxios.get(`/knowledge/list?type=1&user_id=${user_id}`, {
    })
}

export const getKnowledgeById = async (id: number) => {
    return await customAxios.get(`/knowledge?id=${id}`)
}

// 串行上传多个文件
export const uploadFiles = async (fileList: File[] | any[], onProgress: (progress: number) => void) => {
    const formData = new FormData()
    fileList.forEach(file => {
        formData.append(`files`, file)
    })
    console.log('formData:-->', formData.getAll('files'))
    return await customAxios.post(`/knowledge/upload_files`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: any) => {
            if(progressEvent.lengthComputable) {
                const process = Math.round((progressEvent.loaded / progressEvent.total) * 100)
                onProgress(process)
            }
        }
    })
}

// 并行上传多个文件
export const uploadAllFiles = async (fileList: File[], onProgress: (progresses: number[]) => void) => {
    const requests: Promise<any>[] = []
    const progresses: number[] = Array.from({length: fileList.length}, () => 0)
    fileList.forEach((file, index) => {
        const formData = new FormData()
        formData.append('file', file)
        const request = customAxios.post(`/knowledge/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent: any) => {
                if(progressEvent.lengthComputable) {
                    progresses[index] = Math.round((progressEvent.loaded / progressEvent.total) * 100 - 10)
                    onProgress(progresses)
                }
            },
            timeout: 1000 * 10
        })
        request.then(() => {
            progresses[index] = 100
            onProgress(progresses)
        })
        requests.push(request)
    })
    return await Promise.all(requests)
}

// 获取真实向量知识库 id
export const getKnowledgeIds = async (ids: string) => {
    return await customAxios.get(`/knowledge/ids?ids=${ids}`)
}