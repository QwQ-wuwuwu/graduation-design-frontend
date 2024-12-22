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

export default function CreateApi({ children, onConfirm }: 
    { children: React.ReactNode,
      onConfirm: () => void 
    }) {
    
    const [show, setShow] = useState(false)
    const [tokenShow, setTokenShow] = useState(false)
    const [api_key, setApi_key] = useState(false)
    const initail = {
        url: '',
        task_id: -1,
        description: '',
        method: '',
        token: '',
        api_key: '',
        model_id: -1,
        model_name: ''
    }
    const [apiObject, setApiObject] = useState(initail)

    const handleCreate = () => {
        onConfirm()
        setShow(false)
    }

    const handleRadioChange = (value: string) => {
        console.log(value)
        setTokenShow(value === 'yes')
    }

    const handleApiKeyChange = (value: string) => {
        setApi_key(value === 'yes')
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
            <div className="space-y-4">
                <div>
                    <p className="text-gray-500">接口地址<span className="text-[red]">*</span></p>
                    <Input placeholder="https://xxx" value={apiObject.url} onChange={e => setApiObject({...apiObject, url: e.target.value})}></Input>
                </div>
                <div>
                    <p className="text-gray-500">类型用途<span className="text-[red]">*</span></p>
                    <Input placeholder="例如：角色扮演"></Input>
                </div>
                <div>
                    <p className="text-gray-500">接口详细说明</p>
                    <Textarea placeholder="使用方法，参数说明，响应情况等"></Textarea>
                </div>
                <div>
                    <p className="text-gray-500">接口请求方式<span className="text-[red]">*</span></p>
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
                    <p className="text-gray-500">是否携带token</p>
                    <RadioGroup defaultValue="no" onValueChange={handleRadioChange} className="flex space-x-4 mt-1">
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
                <div className="">
                    <p className="text-gray-500">是否需要api_key</p>
                    <RadioGroup defaultValue="no" onValueChange={handleApiKeyChange} className="flex space-x-4 mt-1">
                        <div className=" flex items-center space-x-1">
                            <RadioGroupItem value="yes" id="a1" />
                            <Label htmlFor="a1">需要</Label>
                        </div>
                        <div className=" flex items-center space-x-1">
                            <RadioGroupItem value="no" id="a2" />
                            <Label htmlFor="a2">不需要</Label>
                        </div>
                    </RadioGroup>
                    {api_key && <Input className="mt-2" placeholder="api_key"></Input>}
                </div>
                <div>
                    <p className="text-gray-500">所属模型<span className="text-[red]">*</span></p>
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