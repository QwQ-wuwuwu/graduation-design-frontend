import ArrowRightIcon from "@/components/icons/arrowRight"
import DeleteIcon from "@/components/icons/delete"
import PlusIcon from "@/components/icons/plus"
import RobotIcon from "@/components/icons/robot"
import SettingIcon from "@/components/icons/setting"
import UserIcon from "@/components/icons/user"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import useIndexViewBuildStore from "@/hooks/indexViewBuild"
import { getRandomColor } from "@/util/randomColor"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ChromePicker } from 'react-color'

const assistantInit = {
    name: '',
    description: '',
    avatar: ''
}

interface Assistant {
    name: string,
    description: string,
    avatar: string
}

function BuildDialog({ open, onCancel, onBuild }: 
    { 
        open: boolean,
        onCancel: () => void,
        onBuild: (assistant: Assistant) => void 
    }) {

    const [assistant, setAssistants] = useState(assistantInit)
    const [color, setColor] = useState(getRandomColor())

    useEffect(() => {
        setAssistants({ ...assistant, avatar: color }) // 更新头像颜色
    }, [color])

    const handleColor = (color: any) => {
        setColor(color.hex)
    }
    
    return <Dialog open={open} onOpenChange={onCancel} modal={false}>
        {/* 全局蒙版，因为model=false */}
        {open && <div className=" fixed top-0 left-0 z-50 w-full h-full bg-black/80"></div>}
        <DialogContent className="max-w-[625px]">
            <DialogHeader className="mb-2">
                <DialogTitle>构建助手</DialogTitle>
                <DialogDescription>根据您的需求为您量身构建助手</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="a1"><p>助手头像</p></Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div id="a1" className={`w-8 h-8 cursor-pointer rounded-lg mr-3 flex justify-center items-center`} style={{ backgroundColor: color }}>
                                <RobotIcon className="w-7 h-7 text-[white]" />
                            </div>
                        </PopoverTrigger> 
                        <PopoverContent side="right" className="w-[300p]">
                            <ChromePicker color={color} onChangeComplete={handleColor} disableAlpha={true} className="m-auto" />
                        </PopoverContent> 
                    </Popover>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="a2"><p>助手名称 <span className="text-[red]">*</span></p></Label>
                    <Input onChange={e => setAssistants({ ...assistant, name: e.target.value })} id="a2" placeholder="给助手起个名字" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="a3"><p>你希望助手的角色是什么，具体完成什么任务？<span className="text-[red]">*</span></p></Label>
                    <Textarea id="a3" onChange={(e) => setAssistants({ ...assistant, description: e.target.value })}
                    placeholder="例如：你是xxx，你的任务是xxx，拥有xxx方面丰富的知识和经验，能帮助我解决问题" 
                    className=" resize-none h-24" />
                </div>
            </div>
            <DialogFooter>
                <DialogClose className="space-x-4">
                    <Button onClick={onCancel} className="w-[100px]" variant={'outline'}>取消</Button>
                    <Button className="w-[100px]" onClick={() => onBuild(assistant)}>创建</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}

import { getPortrait } from "@/request/model_api/portrait"
import Loading from "../Loading"
import { createAssistant } from "@/request/API/assistant"

export default function BuildPage() {

    const navigate = useNavigate()
    const data = [
        { name: '助手一', id: 0, description: '你好啊', target: false },
        { name: '助手二', id: 1, description: '今天心情好吗今天心情好吗今天心情好吗今天心情好吗今天心情好吗今天心情好吗今天心情好吗', target: false },
        { name: '助手三', id: 2, description: '吃饭没', target: false },
        { name: '助手四', id: 3, description: '晚上好', target: false },
        { name: '助手三', id: 4, description: '吃饭没', target: false },
        { name: '助手四', id: 5, description: '晚上好', target: false },
        { name: '助手三', id: 6, description: '吃饭没', target: false },
        { name: '助手四', id: 7, description: '晚上好', target: false },
        { name: '助手三', id: 8, description: '吃饭没', target: false },
        { name: '助手四', id: 9, description: '晚上好', target: false },
        { name: '助手三', id: 10, description: '吃饭没', target: false },
        { name: '助手四', id: 11, description: '晚上好', target: false },
        { name: '助手三', id: 12, description: '吃饭没', target: false },
        { name: '助手四', id: 13, description: '晚上好', target: false },
    ]
    const [assistants, setAssistants] = useState(data)
    const [open, setOpen] = useState(false)
    const build = useIndexViewBuildStore((state: any) => state.build)
    const setUnBuild = useIndexViewBuildStore((state: any) => state.setUnBuild)
    useEffect(() => {
        build && setOpen(true)
        return () => {
            setUnBuild()
        }
    }, [])

    const [creating, setCreating] = useState(false)
    const handleCreate = async (data: Assistant) => {
        setOpen(false)
        setCreating(true)
        // await getPortrait(data.description)
        console.log(data)
        // await createAssistant(data)
        setCreating(false)
        setAssistants([])
        navigate(`/layout/assistant`, { state: data })
    }

    const handleSetting = (id: number) => {
        navigate(`/layout/assistant?id=${id}`)
    }

    const handleDelete = (id: number) => {
        console.log(id)
    }

    const handleSwitch = () => {

    }

    return <>
    {!creating ? <div className="w-full max-h-[100%] overflow-y-auto my-scrollbar flex pt-10 pl-[100px] pb-16 flex-wrap items-start">
        {open && <BuildDialog open={open} onCancel={() => setOpen(false)} onBuild={handleCreate} />}
        <Card onClick={() => setOpen(true)} className="w-[300px] h-[300px] mr-6 mb-4 group hover:border-dashed hover:border-[#024DE3] cursor-pointer">
            <CardHeader>
                <CardTitle className=" flex items-center">
                    <div className="w-6 h-6 group-hover:bg-[#024DE3] rounded-sm bg-black flex mr-6 justify-center items-center">
                        <PlusIcon className=" w-4 h-4 text-white"/>
                    </div>
                    <span className="">构建新的助手</span>
                </CardTitle>
                <CardDescription className="pt-4">我们提供场景模板供您使用和参考</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="pt-20 flex justify-end">
                <ArrowRightIcon className="w-8 h-8 group-hover:text-[#024DE3]" />
            </CardFooter>
        </Card>
        {assistants.map((assistant) => (
        <Card onClick={() => handleSetting(assistant.id)} key={assistant.id} className="w-[300px] mr-6 mb-4 group hover:shadow-lg h-[300px] group cursor-pointer">
            <CardHeader>
                <CardTitle className=" flex items-center justify-between">
                    <div className="w-6 h-6 rounded-sm bg-black flex mr-6 justify-center items-center">
                        <PlusIcon className=" w-4 h-4 text-white"/>
                    </div>
                    <span>{assistant.name}</span>
                    <Switch onClick={(e) => e.stopPropagation()} onChange={handleSwitch} />
                </CardTitle>
                <CardDescription className="pt-4 h-[90px]">{assistant.description}</CardDescription>
            </CardHeader>
            <CardContent className="h-[90px]"></CardContent>
            <CardFooter className="text-gray-500 text-center flex justify-between items-center">
                <div className="flex items-center">
                    <UserIcon />
                    <Label><span>创建用户:xxx</span></Label>
                </div>
                <div className="text-gray-500 flex opacity-0 group-hover:opacity-[100] items-center space-x-2">
                    {/* @ts-ignore */}
                    <SettingIcon onClick={handleSetting} className="w-7 h-7" />
                    {/* @ts-ignore */}
                    <DeleteIcon onClick={handleDelete} className="w-5 h-5" />
                </div>
            </CardFooter>
        </Card>
        ))}
        <div className=" fixed bottom-0 z-10 bg-white w-full h-16 ml-[-90px] flex items-center">
            <p className="text-sm text-gray-500">在此页面管理您的助手，对助手上线，下线，编辑等操作. </p>
        </div>
    </div> : <Loading text="助手创建中..." />}
    </>
}