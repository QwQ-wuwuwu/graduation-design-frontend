import { useSearchParams } from "react-router-dom"
import { getKnowledgeById } from "@/request/API/knowledge"
import { useCallback, useEffect, useState } from "react"
import { useKnowDetailStore } from "@/store/knowledge"
import { getKnowledgeDocuments } from "@/request/model_api/knowledge"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import FileIcon from '@/components/icons/file'
import Loading from "@/pages/Loading"

const list = [
    {
        id: 1,
        name: '文件1',
        url: 'https://www.baidu.com',
        custom_separator: ['\n'],
        word_num: 100
    },
    {
        id: 2,
        name: '文件2',
        url: 'https://www.baidu.com',
        custom_separator: ['\n'],
        word_num: 200
    },
    {
        id: 3,
        name: '文件3',
        url: 'https://www.baidu.com',
        custom_separator: ['\n'],
        word_num: 300
    },
    {
        id: 4,
        name: '文件4',
        url: 'https://www.baidu.com',
        custom_separator: ['\n'],
        word_num: 300
    },
    {
        id: 5,
        name: '文件5',
        url: 'https://www.baidu.com',
        custom_separator: ['\n'],
        word_num: 300
    }
]

export default function DocKnowDetail() {

    const [params] = useSearchParams()
    const setKnowledge = useKnowDetailStore((state:any) => state.setKnowledge)
    const [docList, setDocList] = useState<any[]>([])

    const getData = useCallback(async (id: number) => {
        const { data: { data } } = await getKnowledgeById(id)
        setKnowledge(data)
        const res = await getKnowledgeDocuments(data.knowledge_id);
        setDocList([
            ...list,
            ...res.data.data.list
        ])
    }, [])

    const id = params.get('id')
    useEffect(() => {
        id && getData(Number(id))
    }, [id])

    return <>
        {docList.length > 0 ? <div className="w-full max-h-[100%] pl-16 flex flex-wrap items-start overflow-y-auto my-scrollbar">
            {docList.map((item: any, index) => (
                <Card id={item.id} className="w-[350px] h-[200px] mr-4 mt-4">
                    <CardHeader>
                        <CardTitle>#{index + 1} {item.name}</CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center">
                        <div className="text-blue-700 flex cursor-pointer">
                            <a href={item.url}>查看详情：</a>
                            <FileIcon className={'text-blue-500'} />
                        </div>
                    </CardContent>
                    <CardFooter className="pt-5 text-sm flex justify-between">
                        <div className=" whitespace-pre">
                            切分策略：
                            <span className="text-red-700">{item.custom_separator.join('').replace('\n', '\\n')}</span>
                        </div>
                        <div>{item.word_num}个字符</div>
                    </CardFooter>
                </Card>
            ))}
        </div>
        : <Loading />}
    </>
}