import { Button } from "@/components/ui/button"
import EditModel from "./EditModel"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useCallback, useEffect, useState } from "react"
import { getModelList, deleteModelById } from "@/request/API/model"
import { throttle } from 'lodash'
import { useToast } from "@/hooks/use-toast"
import Alert from "@/components/my-ui/Alert"
import Loading from "../Loading"

export default function Management() {

    const getData = async () => {
        getModelList().then(res => {
            setModelList(res.data.data)
            setLoading(true)
        })
    }
    const [loading, setLoading] = useState(false)
    const [modelList, setModelList] = useState([])
    const { toast } = useToast()
    const initial = {
        open: false,
        id: -1,
        title: '删除模型！',
        name: ''
    }
    const [openDelete, setOpenDelete] = useState(initial)

    const refresh = useCallback(throttle(getData, 1000), []) // 用useCallback缓存节流函数，不然每次都会创建新的节流函数，无法做到节流效果

    const handleDelete = async (id :number) => {
        const { data: { code } } = await deleteModelById(id)
        if(code === 200) {
            getData()
            setOpenDelete(initial)
            return toast({ title: '删除成功', description: '模型删除成功', variant: 'default' })
        }
    }

    useEffect(() => {
        getData()
        return refresh.cancel() // 组件卸载时取消节流函数
    }, [])

    return <div className="w-full h-full p-2">
        <div className="w-full h-12 flex justify-end space-x-4 items-center">
            <EditModel onCreate={getData}>
                <Button className="w-[150px]">添加模型</Button>
            </EditModel>
            <Button className="bg-black" onClick={refresh}>刷新</Button>
        </div>
        <div className="w-full h-[calc(100%-48px-64px)] overflow-y-auto my-scrollbar">
            {loading ? <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>模型名称</TableHead>
                        <TableHead className="max-w-[300px]">模型详情</TableHead>
                        <TableHead>模型上下文长度</TableHead>
                        <TableHead>服务提供方</TableHead>
                        <TableHead>最大输出</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {modelList.map((model:any) => <TableRow key={model.id}>
                        <TableCell>{model.name}</TableCell>
                        <TableCell className="max-w-[300px]">
                            <div className=" whitespace-pre-wrap break-all text-truncate-3">{model.description}</div>
                        </TableCell>
                        <TableCell>{model.context}</TableCell>
                        <TableCell>{model.server_from}</TableCell>
                        <TableCell>{model.max_output}</TableCell>
                        <TableCell className="text-right space-x-4">
                            <EditModel id={model.id} onUpdate={getData}>
                                <Button variant={'link'} className="text-blue-600 px-0">模型配置</Button>
                            </EditModel>
                            <Button onClick={() => setOpenDelete({ ...openDelete, open: true, id: model.id, name: model.name })} variant={'link'} className="text-red-500 px-0">删除</Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table> : <Loading />}
        </div>
        <div className="w-full h-16 flex items-center">
            <p className="text-sm text-gray-500">模型集合. </p>
        </div>
        <Alert open={openDelete.open} title={openDelete.title} desc={`确认删除模型 ${openDelete.name}吗？`} 
        onCancel={() => setOpenDelete(initial)}
        onConfirm={() => handleDelete(openDelete.id)}/>
    </div>
}