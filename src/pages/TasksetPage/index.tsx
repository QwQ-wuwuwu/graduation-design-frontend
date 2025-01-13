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
import { createTask, deleteTaskById, getTaskList, searchByName, updateTaskById } from "@/request/API/task"
import { useCallback, useEffect, useState } from "react"
import CreateTask from "./CreateTask"
import Alert from "@/components/my-ui/Alert"
import { debounce } from "lodash"

export default function TasksetPage() {

    const [open, setOpen] = useState(false)
    const editInit = {
        open: false,
        id: -1
    }
    const [edit, setEdit] = useState(editInit)
    const [taskList, setTaskList] = useState([])
    const deleteInit = {
        open: false,
        id: -1,
        title: '删除任务！',
        name: ''
    }
    const [openDelete, setOpenDelete] = useState(deleteInit)

    const getData = async () => {
        const { data: { data } } = await getTaskList()
        setTaskList(data)
    }

    useEffect(() => {
        getData()
    }, [])

    const handleCreate = async (task: any) => {
        const { name, model_id } = task
        if(!name || model_id === -1) {
            return toast({ title: '创建失败', description: '任务名称或模型支持不能为空', variant: 'destructive' })
        }
        setOpen(false)
        const { data: { code } } = await createTask(task)
        if(code !== 200) {
            return toast({ title: '创建失败', description: '创建任务失败', variant: 'destructive' })
        }
        getData()
        return toast({ title: '创建成功', description: '创建任务成功', variant: 'default'})
    }

    const handleEdit = async (task: any) => {
        const { name, model_id } = task
        if(!name || model_id === -1) {
            return toast({ title: '更新失败', description: '任务名称或模型支持不能为空', variant: 'destructive' })
        }
        const { data: { code } } = await updateTaskById(task.id, task)
        if(code !== 200) {
            return toast({ title: '更新失败', description: '任务更新失败', variant: 'destructive' })
        }
        setEdit(editInit)
        getData()
        return toast({ title: '更新成功', description: '任务更新成功', variant: 'default' }) 
    }

    const handleDelete = async (id: number) => {
        const { data: { code } } = await deleteTaskById(id)
        if(code !== 200) {
            return toast({ title: '删除失败', description: '删除任务失败', variant: 'destructive' })
        }
        setOpenDelete(deleteInit)
        getData()
        return toast({ title: '删除成功', description: '删除任务成功', variant: 'default' })
    }

    const handleSearch = useCallback(debounce(async (name: string) => {
        const keyWord = name.trim().toUpperCase()
        if(!keyWord) {
            return getData()
        }
        const { data: { data } } = await searchByName(name)
        setTaskList(data)
    }, 300), [])

    return <div className="w-full h-full overflow-y-auto my-scrollbar p-2">
        <div className=" fixed right-4 z-10 h-12 flex items-center space-x-4 justify-end">
            <SearchInput placeholder="任务名称" onChange={(e) => handleSearch(e.target.value)} />
            <Button onClick={() => setOpen(true)} className="w-[150px]">创建任务</Button>
        </div>
        <div className="mt-10 mb-[80px]">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>任务名称</TableHead>
                        <TableHead>模型支持</TableHead>
                        <TableHead>任务描述</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {taskList.map((task: any) => <TableRow key={task.id} >
                        <TableCell>{task.name}</TableCell>
                        <TableCell>{task.model_name}</TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell className="text-right space-x-4">
                            <Button onClick={() => setEdit({open: true, id: task.id})} variant={'link'} className="text-blue-600 px-0">编辑</Button>
                            <Button onClick={() => setOpenDelete({...openDelete, open: true, id: task.id, name: task.name})} variant={'link'} className="text-red-500 px-0">删除</Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </div>
        <div className=" fixed bottom-0 z-10 bg-white w-full h-16 flex items-center">
            <p className="text-sm text-gray-500">任务集合. </p>
        </div>
        {open && <CreateTask open={open} onCancel={() => setOpen(false)} onCreate={handleCreate} />}
        {edit.open && <CreateTask open={edit.open} id={edit.id} onCancel={() => setEdit(editInit)} onEdit={handleEdit} />}
        <Alert open={openDelete.open} title={openDelete.title} desc={`确认删除模型 ${openDelete.name}吗？`}
        onCancel={() => setOpenDelete(deleteInit)} 
        onConfirm={() => handleDelete(openDelete.id)}/>
    </div>
}