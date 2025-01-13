import SearchSelect from "@/components/my-ui/SearchSelect"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { createAPI, getAPIById, updateAPI } from "@/request/API/api"
import { getModelList } from "@/request/API/model"
import { getTaskList } from "@/request/API/task"
import { debounce } from "lodash"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"

export default function CreateApi({ open, id, onConfirm, onCancel }: 
    { open: boolean,
      id?: number,
      onConfirm: () => void,
      onCancel: () => void 
    }) {
    
    const [tokenShow, setTokenShow] = useState(false)
    const [api_key, setApi_key] = useState(false)
    const initail = {
        url: '',
        task_id: -1,
        task_name: '',
        description: '',
        method: '',
        token: '',
        api_key: '',
        model_id: -1,
        model_name: ''
    }
    const [apiObject, setApiObject] = useState(initail)

    useEffect(() => {
        if(id && id !== -1) {
            getAPIById(id as number).then(({ data: { data } }) => {
                setApiObject(data)
                if(data.token) {
                    setTokenShow(true)
                    tokenRef.current = data.token
                }
                if(data.api_key) {
                    setApi_key(true)
                    api_keyRef.current = data.api_key
                }
            })
        }
    }, [id])

    const handleCreate = async () => {
        const { model_id, url, method } = apiObject
        if(model_id === -1 || !url || !method) return toast({title: '创建失败', description: '请填写完整信息', variant: 'destructive', duration: 2000})
        const { name } = modelList.find((item: any) => item.id === model_id) as any
        const data = {...apiObject, model_name: name}
        const { data: { code } } = await createAPI(data)
        if(code !== 200) return toast({title: '创建失败', description: '创建接口失败，请稍后再试', variant: 'destructive', duration: 2000})
        onConfirm()
        setApiObject(initail)
        setTokenShow(false)
        setApi_key(false)
        return toast({title: '创建成功', description: '创建接口成功', variant: 'default', duration: 2000})
    }

    const handleEdit = async () => {
        console.log(apiObject)
        const { model_id, url, task_id, method } = apiObject
        if(model_id === -1 || !url || !task_id || !method) return toast({title: '更新失败', description: '请填写完整信息', variant: 'destructive', duration: 2000})
        const { data: { code } } = await updateAPI(id as number, apiObject)
        if(code !== 200) return toast({title: '更新失败', description: '更新接口失败，请稍后再试', variant: 'destructive', duration: 2000})
        onConfirm()
        return toast({title: '更新成功', description: '更新接口成功', variant: 'default', duration: 2000})
    }

    const tokenRef = useRef('')
    const handleRadioChange = (value: string) => {
        if(value === 'yes') {
            setTokenShow(true)
            setApiObject({...apiObject, token: tokenRef.current})
        } else {
            setTokenShow(false)
            setApiObject({...apiObject, token: ''})
        }
    }

    const api_keyRef = useRef('')
    const handleApiKeyChange = (value: string) => {
        if(value === 'yes') {
            setApi_key(true)
            setApiObject({...apiObject, api_key: api_keyRef.current})
        } else {
            setApi_key(false)
            setApiObject({...apiObject, api_key: ''})
        }
    }

    const [taskList, setTaskList] = useState([])
    const taskListRef = useRef([])
    const handleOpen = async () => {
        const { data: { data } } = await getTaskList()
        setTaskList(data)
        taskListRef.current = data
    }

    const handleSearch = useCallback(debounce((e: ChangeEvent<HTMLInputElement>) => {
        const keyWord = e.target.value.trim()
        if(!keyWord) return setTaskList(taskListRef.current)
        const list = taskListRef.current.filter((item:any) => item.name.toUpperCase().includes(keyWord.toUpperCase()))
        setTaskList(list)
    }, 300), [])

    const [modelList, setModelList] = useState([])
    const handleModelOpen = async () => {
        const { data: { data } } = await getModelList()
        setModelList(data)
    }

    return <Dialog open={open} onOpenChange={() => onCancel()}>
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
                    <p className="text-gray-500">任务类型<span className="text-[red]">*</span></p>
                    <SearchSelect defaultValue={String(apiObject.task_id)} selectValue={apiObject.task_name || "请选择任务类型"} inputPlaceholder="搜索任务"
                    onOpen={handleOpen} onSearch={handleSearch} 
                    onSelect={(value) => setApiObject({...apiObject, task_id: parseInt(value)})}
                    list={taskList}/>
                </div>
                <div>
                    <p className="text-gray-500">接口详细说明</p>
                    <Textarea value={apiObject.description} onChange={e => setApiObject({...apiObject, description: e.target.value})} placeholder="使用方法，参数说明，响应情况等"></Textarea>
                </div>
                <div>
                    <p className="text-gray-500">接口请求方式<span className="text-[red]">*</span></p>
                    <Select onValueChange={(value) => setApiObject({...apiObject, method: value})}>
                        <SelectTrigger>
                            <SelectValue defaultValue={apiObject.method} placeholder={apiObject.method.toUpperCase() || '请求方式'}></SelectValue>
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
                    <RadioGroup value={!apiObject.token ? 'no' : 'yes'} onValueChange={handleRadioChange} className="flex space-x-4 mt-1">
                        <div className=" flex items-center space-x-1">
                            <RadioGroupItem value="yes" id="r1" />
                            <Label htmlFor="r1">携带</Label>
                        </div>
                        <div className=" flex items-center space-x-1">
                            <RadioGroupItem value="no" id="r2" />
                            <Label htmlFor="r2">不携带</Label>
                        </div>
                    </RadioGroup>
                    {tokenShow && <Input value={apiObject.token} onChange={(e) => setApiObject({...apiObject, token: e.target.value})} className="mt-2" placeholder="token"></Input>}
                </div>
                <div className="">
                    <p className="text-gray-500">是否需要api_key</p>
                    <RadioGroup value={apiObject.api_key ? 'yes' : 'no'} onValueChange={handleApiKeyChange} className="flex space-x-4 mt-1">
                        <div className=" flex items-center space-x-1">
                            <RadioGroupItem value="yes" id="a1" />
                            <Label htmlFor="a1">需要</Label>
                        </div>
                        <div className=" flex items-center space-x-1">
                            <RadioGroupItem value="no" id="a2" />
                            <Label htmlFor="a2">不需要</Label>
                        </div>
                    </RadioGroup>
                    {api_key && <Input value={apiObject.api_key} onChange={(e) => setApiObject({...apiObject, api_key: e.target.value})} className="mt-2" placeholder="api_key"></Input>}
                </div>
                <div>
                    <p className="text-gray-500">所属模型<span className="text-[red]">*</span></p>
                    <Select onValueChange={(value) => setApiObject({...apiObject, model_id: parseInt(value)})} onOpenChange={handleModelOpen}>
                        <SelectTrigger>
                            <SelectValue defaultValue={apiObject.model_id} placeholder={apiObject.model_name || '模型名称'}></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {modelList.map((item: any) => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <Button variant={'outline'} className="w-[100px]" onClick={onCancel}>取消</Button>
                {!id ? <Button onClick={handleCreate} className="w-[100px]">创建</Button>
                : <Button onClick={handleEdit} className="w-[100px]">更新</Button>}
            </DialogFooter>
        </DialogContent>
    </Dialog>
}