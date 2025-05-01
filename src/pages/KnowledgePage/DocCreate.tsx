import {
    Dialog,
    DialogDescription,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { getModelList } from "@/request/API/model"
import { createDocKnowledge } from "@/request/API/knowledge"
import { toast } from "@/hooks/use-toast"
import { User } from "@/types"
import { createKnowledgeApi } from "@/request/model_api/knowledge"

type Knowledge = {
    name: string,
    description: string,
    model_id: number,
    user_id: number
}

const knowledgeInit: Knowledge = {
    name: '',
    description: '',
    model_id: -1,
    user_id: -1
} 
const user: User = JSON.parse(sessionStorage.getItem('user') as string)

export default function DocCreate({
    open,
    onCancel,
    onConform
}: {
    open: boolean,
    onCancel: () => void
    onConform: () => void
}) {

    const [modelList, setModelList] = useState([])
    const [knowledge, setKnowledge] = useState(knowledgeInit)

    const handleSelectOpen = async () => {
        const { data: { data } } = await getModelList()
        setModelList(data)
    }

    const handleCreate = async () => {
        const res: any = await createKnowledgeApi({ name: knowledge.name, description: knowledge.description });
        if (res.data.code !== 200) {
            return toast({title: '创建失败', description: '创建知识库失败', variant: 'destructive', duration: 2000})
        }
        const { data: { code }} = await createDocKnowledge({ ...knowledge, user_id: user.id, knowledge_id: res.data.data.id })
        if(code !== 200) {
            return toast({title: '创建失败', description: '创建文档知识库失败', variant: 'destructive', duration: 2000})
        }
        setKnowledge(knowledgeInit)
        onConform()
        return toast({title: '创建成功', description: '创建文档知识库成功', duration: 2000})
    }

    return <Dialog open={open} onOpenChange={() => onCancel()}>
        <DialogContent className="max-w-[625px]">
            <DialogHeader>
                <DialogTitle>创建知识库</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="p-4 space-y-4">
                <div>
                    <Label htmlFor="i1" className="text-sm text-[#64748B] font-bold">知识库名称
                        <span className="text-[red]">*</span>
                    </Label>
                    <Input value={knowledge.name} onChange={(e) => setKnowledge({...knowledge, name: e.target.value})} 
                        id={'i1'} type="text" placeholder="知识库名称" />
                </div>
                <div>
                    <Label htmlFor="i1" className="text-sm text-gray-500 font-bold">知识库描述</Label>
                    <Textarea value={knowledge.description} onChange={(e) => setKnowledge({...knowledge, description: e.target.value})}
                        id={'i1'} placeholder="对知识库的简单描述" className=" h-[80px]" />
                </div>
                <div>
                    <Label htmlFor="i2" className="text-sm text-gray-500 font-bold">模型<span className="text-[red]">*</span></Label>
                    <Select onOpenChange={handleSelectOpen}
                        onValueChange={(id) => setKnowledge({...knowledge, model_id: Number(id)})}>
                        <SelectTrigger className="">
                            <SelectValue placeholder={'选择模型'}/>
                        </SelectTrigger>
                        <SelectContent>
                            {modelList.map((model:any) => <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <Button onClick={onCancel} className="w-[100px]" variant={'outline'}>取消</Button>
                <Button onClick={handleCreate} className="w-[100px]">创建</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}