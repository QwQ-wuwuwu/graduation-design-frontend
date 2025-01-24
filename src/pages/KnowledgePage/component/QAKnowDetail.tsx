import { useSearchParams } from "react-router-dom"
import { getKnowledgeById } from "@/request/API/knowledge"
import { useCallback, useEffect } from "react"
import { useKnowDetailStore } from "@/store/knowledge"

export default function QAKnowDetail() {

    const [params] = useSearchParams()
    const setKnowledge = useKnowDetailStore((state:any) => state.setKnowledge)

    const getData = useCallback(async (id: number) => {
        const { data: { data } } = await getKnowledgeById(id)
        setKnowledge(data)
    }, [])

    const id = params.get('id')
    useEffect(() => {
        console.log(id)
        id && getData(Number(id))
    }, [id])

    return <div>
        
    </div>
}