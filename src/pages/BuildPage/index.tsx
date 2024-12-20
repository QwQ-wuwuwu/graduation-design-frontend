import ArrowRightIcon from "@/components/icons/arrowRight"
import PlusIcon from "@/components/icons/plus"
import RobotIcon from "@/components/icons/robot"
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
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getRandomColor } from "@/util/randomColor"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import UserIcon from "@/components/icons/user"
import SettingIcon from "@/components/icons/setting"
import DeleteIcon from "@/components/icons/delete"

function BuildDialog({ children, onBuild }: { children: React.ReactNode, onBuild: () => void }) {
    return <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
            <DialogHeader className="mb-2">
                <DialogTitle>构建助手</DialogTitle>
                <DialogDescription>根据您的需求为您量身构建助手</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="a1"><p>助手头像</p></Label>
                    <div id="a1" className={`w-8 h-8 rounded-lg mr-3 flex justify-center items-center`} style={{ backgroundColor: getRandomColor() }}>
                        <RobotIcon className="w-7 h-7 text-[white]" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="a2"><p>助手名称 <span className="text-[red]">*</span></p></Label>
                    <Input id="a2" placeholder="给助手起个名字" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="a3"><p>你希望助手的角色是什么，具体完成什么任务？<span className="text-[red]">*</span></p></Label>
                    <Textarea id="a3" placeholder="输入您的想法" className=" resize-none h-24" />
                </div>
            </div>
            <DialogFooter>
                <DialogClose className="space-x-4">
                    <Button className="w-[100px]" variant={'outline'}>取消</Button>
                    <Button className="w-[100px]" onClick={onBuild}>创建</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}

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

    const handleCilck = () => {
        const id = 12
        navigate(`/layout/assistant?id=${id}`)
    }

    const handleSetting = (id: number) => {

    }

    const handleDelete = (id: number) => {

    }

    return <div className="w-full max-h-[100%] overflow-y-auto my-scrollbar flex pt-10 pl-[100px] pb-10 flex-wrap items-start">
        <BuildDialog onBuild={handleCilck}>
            <Card className="w-[300px] h-[300px] mr-6 mb-4 group hover:border-dashed hover:border-[#024DE3] cursor-pointer">
                <CardHeader>
                    <CardTitle className=" flex items-center">
                        <div className="w-6 h-6 group-hover:bg-[#024DE3] rounded-sm bg-black flex mr-6 justify-center items-center">
                            <PlusIcon className=" w-4 h-4 text-white"/>
                        </div>
                        <span>构建助手</span>
                    </CardTitle>
                    <CardDescription className="pt-4">我们提供场景模板供您使用和参考</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter className="pt-20 flex justify-end">
                    <ArrowRightIcon className="w-8 h-8 group-hover:text-[#024DE3]" />
                </CardFooter>
            </Card>
        </BuildDialog>
        {assistants.map((assistant) => (
        <Card key={assistant.id} className="w-[300px] mr-6 mb-4 group hover:shadow-lg h-[300px] group cursor-pointer">
            <CardHeader>
                <CardTitle className=" flex items-center">
                    <div className="w-6 h-6 rounded-sm bg-black flex mr-6 justify-center items-center">
                        <PlusIcon className=" w-4 h-4 text-white"/>
                    </div>
                    <span>{assistant.name}</span>
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
    </div>
}