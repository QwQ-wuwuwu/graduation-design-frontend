import {
    Dialog,
    DialogDescription,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getModelList } from "@/request/API/model"
import { useEffect, useState } from "react"
import { getTaskById } from "@/request/API/task"

export default function CreateTask({ open, id, onCancel, onCreate, onEdit }: 
    { 
        open: boolean, id?:number, onCancel: () => void, 
        onCreate?: (task:any) => void, onEdit?: (task:any) => void 
    }) {

    const [modelList, setModelList] = useState([])
    const initial = {
        name: '',
        model_id: -1,
        model_name: '',
        description: ''
    }
    const [task, setTask] = useState(initial)

    useEffect(() => {
        id && getTaskById(id as number).then(res => {
            setTask(res.data.data)
        })
    }, [])

    const handleCreate = () => {
        onCreate && onCreate(task)
    }

    const handleEdit = () => {
        onEdit && onEdit(task)
    }

    const handleSelectOpen = async () => {
        const { data: { data } } = await getModelList()
        setModelList(data)
    }

    return <Dialog open={open} onOpenChange={() => onCancel()}>
        <DialogContent className="max-w-[625px]">
            <DialogHeader>
                <DialogTitle>创建任务</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="p-4 space-y-4">
                <div>
                    <Label htmlFor="i1" className="text-sm text-gray-500 font-bold">任务名称<span className="text-[red]">*</span></Label>
                    <Input value={task.name} onChange={e => setTask({...task, name: e.target.value})} id={'i1'} type="text" placeholder="xxx" />
                </div>
                <div>
                    <Label htmlFor="i2" className="text-sm text-gray-500 font-bold">模型支持<span className="text-[red]">*</span></Label>
                    <Select onOpenChange={handleSelectOpen} onValueChange={(value) => setTask({...task, model_id: Number(value)})}>
                        <SelectTrigger className="">
                            <SelectValue placeholder={!id ? '选择一个支持此任务的模型' : task.model_name} defaultValue={task.model_id} />
                        </SelectTrigger>
                        <SelectContent>
                            {modelList.map((model:any) => <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="i1" className="text-sm text-gray-500 font-bold">任务描述</Label>
                    <Textarea value={task.description} onChange={e => setTask({...task, description: e.target.value})} id={'i1'} placeholder="简述任务目标，效果，适用场景等等" className=" resize-none" />
                </div>
            </div>
            <DialogFooter>
                <Button onClick={onCancel} className="w-[100px]" variant={'outline'}>取消</Button>
                {!id ? <Button onClick={handleCreate} className="w-[100px]">创建</Button>
                    : <Button onClick={handleEdit} className="w-[100px]">更新</Button>}
            </DialogFooter>
        </DialogContent>
    </Dialog>
}