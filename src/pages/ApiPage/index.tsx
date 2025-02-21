import Alert from "@/components/my-ui/Alert"
import SearchInput from "@/components/my-ui/SearchInput"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { deleteAPI, getAPIList } from "@/request/API/api"
import { debounce } from "lodash"
import { useCallback, useEffect, useRef, useState } from "react"
import Loading from "../Loading"
import CreateApi from "./CreateApi"

export default function ApiPage() {

    const [loading, setLoading] = useState(false)
    const [apiList, setApiList] = useState([])
    const deleteInit = {
        open: false,
        id: -1,
        title: '删除接口 ！',
        url: ''
    }
    const [openDelete, setOpenDelete] = useState(deleteInit)
    const [createOpen, setCreateOpen] = useState(false)
    const editInit = {
        open: false,
        id: -1
    }
    const [editOpen, setEditOpen] = useState(editInit)
    const apiListRef = useRef([])

    const getData = useCallback(async () => {
        const { data: { data } } = await getAPIList()
        setApiList(data)
        apiListRef.current = data
        setLoading(true)
    }, [])

    useEffect(() => {
        getData()
    }, [])

    const handleCreate = () => {
        getData()
        setCreateOpen(false)
    }

    const handleDelete = async (id: number) => {
        const { data: { code } } = await deleteAPI(id)
        if(code !== 200) {
            return toast({title: '删除失败', description: '删除接口失败', variant: 'destructive', duration: 2000})
        }
        getData()
        setOpenDelete(deleteInit)
        return toast({title: '删除成功', description: '删除接口成功', variant: 'default', duration: 2000})
    }

    const handleApiSearch = useCallback(debounce((key: string) => {
        const keyWord = key.trim().toUpperCase()
        if(!keyWord) {
            setApiList(apiListRef.current)
            return
        }
        const result = apiListRef.current.filter((api: any) => {
            return api.task_name.toUpperCase().includes(keyWord)
        })
        setApiList(result)
    }, 300), [])

    return <div className="w-full h-full overflow-y-auto my-scrollbar p-2">
        <div className=" fixed right-4 z-10 h-12 flex items-center space-x-4 justify-end">
            <SearchInput onChange={(e) => handleApiSearch(e.target.value)} placeholder="搜索任务类型" />
            <Button onClick={() => setCreateOpen(true)} className="w-[150px]">创建接口地址</Button>
        </div>
        {loading ? <div className="mt-10 mb-[80px] w-full">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">请求地址</TableHead>
                        <TableHead className="">接口说明</TableHead>
                        <TableHead className="">接口任务</TableHead>
                        <TableHead className="">任务说明</TableHead>
                        <TableHead className="">模型支持</TableHead>
                        <TableHead className="w-[80px]">请求方法</TableHead>
                        <TableHead className="text-right w-[100px]">操作</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {apiList.map((api: any) => <TableRow key={api.id} >
                        <TableCell className="max-w-[250px] overflow-hidden text-ellipsis">{api.url}</TableCell>
                        <TableCell>
                            <div className="max-w-[600px] whitespace-pre-wrap break-all text-truncate-3">{api.description}</div>
                        </TableCell>
                        <TableCell>{api.task_name}</TableCell>
                        <TableCell>
                            <div className="max-w-[600px] whitespace-pre-wrap break-all text-truncate-3">{api.task_desc}</div>
                        </TableCell>
                        <TableCell>{api.model_name}</TableCell>
                        <TableCell>{api.method}</TableCell>
                        <TableCell className="text-right space-x-4">
                            <Button onClick={() => setEditOpen({...editOpen, id: api.id, open: true})} variant={'link'} className="text-blue-600 px-0">编辑</Button>
                            <Button onClick={() => setOpenDelete({...openDelete, url: api.url, open: true, id: api.id})} variant={'link'} className="text-red-500 px-0">删除</Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </div> : <div className="w-full h-full flex justify-center items-center">
            <Loading />
        </div>}
        <div className=" fixed bottom-0 z-10 bg-white w-full h-16 flex items-center">
            <p className="text-sm text-gray-500">接口集合. </p>
        </div>
        <Alert open={openDelete.open} title={openDelete.title} desc={`确认删除接口 ${openDelete.url}吗？`} 
        onCancel={() => setOpenDelete(deleteInit)}
        onConfirm={() => handleDelete(openDelete.id)}/>
        <CreateApi open={createOpen} onConfirm={handleCreate} onCancel={() => setCreateOpen(false)} />
        <CreateApi open={editOpen.open} id={editOpen.id} onConfirm={() => {setEditOpen(editInit); getData()}} 
        onCancel={() => setEditOpen(editInit)} />
    </div>
}