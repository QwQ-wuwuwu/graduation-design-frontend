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
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectGroup, SelectItem, SelectContent, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function EditApi({ children, onConfirm }: 
    { children: React.ReactNode,
      onConfirm: () => void 
    }) {
    
    const [show, setShow] = useState(false)
    const [tokenShow, setTokenShow] = useState(false)

    const handleCreate = () => {
        onConfirm()
        setShow(false)
    }

    const handleRadioChange = (value: string) => {
        console.log(value)
        setTokenShow(value === 'yes')
    }

    return <Dialog open={show} onOpenChange={(open) => setShow(open)}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className="max-w-[625px]">
            <DialogHeader>
                <DialogTitle>创建接口地址</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="text-gray-500 space-y-4">
                <div>
                    <p>接口地址<span className="text-[red]">*</span></p>
                    <Input placeholder="https://xxx"></Input>
                </div>
                <div>
                    <p>类型用途<span className="text-[red]">*</span></p>
                    <Input placeholder="角色扮演"></Input>
                </div>
                <div>
                    <p>接口详细说明</p>
                    <Textarea placeholder="大模型将扮演您指定的角色，对角色的定位说明越清晰，效果越好"></Textarea>
                </div>
                <div>
                    <p>接口请求方式<span className="text-[red]">*</span></p>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder='请求方式'></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="get">GET</SelectItem>
                                <SelectItem value="post">POST</SelectItem>
                                <SelectItem value="delete">DELETE</SelectItem>
                                <SelectItem value="put">PUT</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="">
                    <p>是否携带token</p>
                    <RadioGroup defaultValue="no" onValueChange={handleRadioChange} className="flex space-x-4">
                        <div className=" flex items-center space-x-1">
                            <RadioGroupItem value="yes" id="r1" />
                            <Label htmlFor="r1">携带</Label>
                        </div>
                        <div className=" flex items-center space-x-1">
                            <RadioGroupItem value="no" id="r2" />
                            <Label htmlFor="r2">不携带</Label>
                        </div>
                    </RadioGroup>
                    {tokenShow && <Input className="mt-2" placeholder="token"></Input>}
                </div>
                <div>
                <p>所属模型<span className="text-[red]">*</span></p>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder='模型名称'></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="get">GET</SelectItem>
                                <SelectItem value="post">POST</SelectItem>
                                <SelectItem value="delete">DELETE</SelectItem>
                                <SelectItem value="put">PUT</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <Button variant={'outline'} className="w-[100px]" onClick={() => setShow(false)}>取消</Button>
                <Button onClick={handleCreate} className="w-[100px]">创建</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}