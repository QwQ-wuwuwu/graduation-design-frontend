import {
    Dialog,
    DialogTrigger,
    DialogDescription,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createModel, getModelById, updateModelById } from "@/request/API/model"
import { useToast } from "@/hooks/use-toast"

export default function EditModel({ children, id, onCreate, onUpdate }: 
    { 
        children: React.ReactNode, id?: number, 
        onCreate?: () => void 
        onUpdate?: () => void
    }) {

    const [show, setShow] = useState(false)
    const initail = {
        name: '',
        description: '',
        context: '',
        max_output: ''
    }
    const [model, setModel] = useState(initail)
    const { toast } = useToast()

    useEffect(() => {
        id && getModelById(id).then(res => {
            setModel(res.data.data)
        })
    }, [id])

    const handleCreate = async () => {
        const res = await createModel(model)
        if(res.data.code === 200) {
            setShow(false)
            setModel(initail)
            onCreate && onCreate()
            return toast({ title: '添加成功', description: '模型添加成功', variant: 'default' })
        }
        return toast({ title: '添加失败', description: res.data.message, variant: 'destructive' })
    }

    const handleUpdate = async () => {
        const res = id ? await updateModelById(id, model) : null
        if(res?.data.code === 200) {
            setShow(false)
            onUpdate && onUpdate()
            return toast({ title: '更新成功', description: res.data.message, variant: 'default' })
        }
        return toast({ title: '添加失败', description: res?.data.message, variant: 'destructive' })
    }

    return <Dialog open={show} onOpenChange={(open) => setShow(open)}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>添加模型</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="space-y-4 text-gray-500">
                <div>
                    <p>模型名称<span className="text-[red]">*</span></p>
                    <Input placeholder="" value={model.name} onChange={(e) => setModel({...model, name: e.target.value})} />
                </div>
                <div>
                    <p>模型详情</p>
                    <Textarea placeholder="描述模型优势，使用场景等" value={model.description} onChange={(e) => setModel({...model, description: e.target.value})} className=" resize-none" />
                </div>
                <div>
                    <p>上下文大小</p>
                    <Input value={model.context} placeholder="例如：120k" onChange={e => setModel({...model, context: e.target.value})} />
                </div>
                <div>
                    <p>最大输出</p>
                    <Input placeholder="例如：4k" value={model.max_output} onChange={e => setModel({...model, max_output: e.target.value})} />
                </div>
            </div>
            <DialogFooter>
                <Button variant={'outline'} className="w-[100px]" onClick={() => setShow(false)}>取消</Button>
                {!id ? <Button onClick={handleCreate} className="w-[100px]">添加</Button>
                    : <Button onClick={handleUpdate} className="w-[100px]">修改</Button>}
            </DialogFooter>
        </DialogContent>
    </Dialog>
}