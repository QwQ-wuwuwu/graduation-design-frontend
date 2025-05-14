import logoSrc from '@/assets/login-logo-small.png'
import SearchInput from '@/components/my-ui/SearchInput'
import { Label } from '@/components/ui/label'
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TabIcon from '@/components/icons/tab'

export default function HeaderMenu() {
    const navigate = useNavigate()
    const [currentPath, setCurrentPath] = useState('')
    const user = JSON.parse(sessionStorage.getItem('user') as string)

    const handleTabsChange = (value: string) => {
        switch (value) {
            case 'updateUserInfo':
                navigate('/layout/user/info')
                return
            case 'theme':
                navigate('/layout/user/theme')
                return
        }
    }

    const handleKnowledgeChange = (value: string) => {
        switch (value) {
            case 'doc':
                navigate('/layout/knowledge/doc')
                return
            case 'qa':
                navigate('/layout/knowledge/qa')
                return
        }
    }

    const handleModelChange = (value: string) => {
        switch (value) {
            case 'management':
                navigate('/layout/model/management')
                return
            case 'finetune':
                navigate('/layout/model/finetune')
                return
        }
    }

    const handleSystemChange = (value: string) => {
        switch (value) {
            case 'model':
                navigate('/layout/system/model')
                return
            case 'user':
                navigate('/layout/system/user')
                return
            case 'assistant':
                navigate('/layout/system/assistant')
                return
        }
    }

    useEffect(() => {
        setCurrentPath(window.location.pathname)
    }, [window.location.pathname])

    return <div className=" bg-[#F4F5F8] h-[65px] w-full pl-3 flex justify-between pr-3">
        <div className='w-[160px] h-full pt-4 pl-4'>
            <img src={logoSrc} alt="logo-small" className='m-auto w-[104px] min-w-[104px]' />
        </div>
        <div className='w-full h-full flex justify-center pt-2'>
            {/* 用户设置选项卡 */}
            {currentPath.includes('/layout/user') && <div>
                <Tabs defaultValue='updateUserInfo' onValueChange={handleTabsChange}>
                    <TabsList className='space-x-3 h-full'>
                        <TabsTrigger value='updateUserInfo' className='data-[state=active]:text-[#024DE3] w-[150px] h-10'><TabIcon className='mr-2' />个人中心</TabsTrigger>
                        <TabsTrigger value='theme' className='data-[state=active]:text-[#024DE3] w-[150px] h-10'><TabIcon className='mr-2' />主题配色</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>}
            {/* 构建助手 搜索框 */}
            {currentPath.includes('/layout/build') && <div>
                <SearchInput className='w-[300px]' placeholder='搜索您需要的助手' />
            </div>}
            {/* 预置助手 搜索框 */}
            {currentPath.includes('/layout/preset') && <div>
                <SearchInput className='w-[300px]' placeholder='搜索您需要的预置助手' />
            </div>}
            {/* 知识库选项卡 */}
            {currentPath.includes('/layout/knowledge') && <div>
                <Tabs defaultValue='doc' onValueChange={handleKnowledgeChange}>
                    <TabsList className='space-x-3 h-full'>
                        <TabsTrigger value='doc' className='data-[state=active]:text-[#024DE3] w-[150px] h-10'><TabIcon className='mr-2' />文档知识库</TabsTrigger>
                        <TabsTrigger value='qa' className='data-[state=active]:text-[#024DE3] w-[150px] h-10'><TabIcon className='mr-2' />QA知识库</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>}
            {/* 模型选项卡 */}
            {currentPath.includes('/layout/model') && <div>
                <Tabs defaultValue='management' onValueChange={handleModelChange}>
                    <TabsList className='space-x-3 h-full'>
                        <TabsTrigger value='management' className='data-[state=active]:text-[#024DE3] w-[150px] h-10'><TabIcon className='mr-2' />模型管理</TabsTrigger>
                        <TabsTrigger value='finetune' className='data-[state=active]:text-[#024DE3] w-[150px] h-10'><TabIcon className='mr-2' />模型微调</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>}
            {/* 系统管理选项卡 */}
            {currentPath.includes('/layout/system') && <div>
                <Tabs defaultValue='model' onValueChange={handleSystemChange}>
                    <TabsList className='space-x-3 h-full'>
                        <TabsTrigger value='model' className='data-[state=active]:text-[#024DE3] w-[150px] h-10'><TabIcon className='mr-2' />模型实况</TabsTrigger>
                        <TabsTrigger value='user' className='data-[state=active]:text-[#024DE3] w-[150px] h-10'><TabIcon className='mr-2' />用户管理</TabsTrigger>
                        {/* <TabsTrigger value='assistant' className='data-[state=active]:text-[#024DE3] w-[150px] h-10'><TabIcon className='mr-2' />助手管理</TabsTrigger> */}
                    </TabsList>
                </Tabs>
            </div>}
        </div>
        <div className='w-[160px] h-full flex justify-end items-center pr-4'>
            <TooltipProvider delayDuration={300}>
                <Tooltip>
                    <TooltipTrigger>
                        <div onClick={() => navigate('/layout/user')}
                            className='bg-[#024DE3] border w-[40px] h-[40px] rounded-[100%] text-center whitespace-nowrap overflow-hidden cursor-pointer'>
                            <span className=' text-[11px] text-white font-[550] leading-[40px]'>{user.name}</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent className='bg-[#024DE3]'>
                        <Label>{user.name}</Label>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    </div>
}