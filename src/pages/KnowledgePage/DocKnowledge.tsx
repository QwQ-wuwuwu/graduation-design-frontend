import { useDocKnowledgeStore } from "@/store/knowledge"
import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Loading from "../Loading"
import { Button } from "@/components/ui/button"
import { formatBanckendTime } from "@/util/date"
import { useNavigate } from "react-router-dom"

type DocList = {
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

export default function DocKnowledge() {

    const docList:DocList[] = useDocKnowledgeStore((state:any) => state.docList)
    const loadDocList = useDocKnowledgeStore((state:any) => state.loadDocList)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        loadDocList().then(() => setLoading(true))
    }, [])

    const handleDetail = (id: number) => {
        navigate(`/layout/knowledge/doclib?id=${id}`)
    }

    return <>
        {loading ? <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>知识库名称</TableHead>
                    <TableHead>模型</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>更新时间</TableHead>
                    <TableHead>创建用户</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {docList.map((item) => <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.model_name}</TableCell>
                    <TableCell>{formatBanckendTime(item.insert_time)}</TableCell>
                    <TableCell>{formatBanckendTime(item.update_time)}</TableCell>
                    <TableCell>{item.user_name}</TableCell>
                    <TableCell className="text-right space-x-4">
                        <Button onClick={() => handleDetail(item.id)} variant={'link'} className="text-blue-600 px-0">详情</Button>
                        <Button variant={'link'} className="text-red-500 px-0">删除</Button>
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table> : <Loading />}
    </>
}