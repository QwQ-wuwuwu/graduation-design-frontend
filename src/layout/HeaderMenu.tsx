import logoSrc from '@/assets/login-logo-small.png'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Label } from '@/components/ui/label'

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

    useEffect(() => {
        setCurrentPath(window.location.pathname)
    }, [window.location.pathname])

    return <div className=" bg-[#F4F5F8] h-[65px] w-full pl-3 flex justify-between pr-3">
        <div className='w-[160px] h-full pt-4 pl-4'>
            <img src={logoSrc} alt="logo-small" className='m-auto w-[104px] min-w-[104px]' />
        </div>
        <div className='w-full h-full pt-4 flex justify-center'>
            {currentPath.includes('/layout/user') && <div>
                <Tabs defaultValue='updateUserInfo' onValueChange={handleTabsChange}>
                    <TabsList className='space-x-3 h-full'>
                        <TabsTrigger value='updateUserInfo' className='data-[state=active]:text-[#024DE3]'>个人中心</TabsTrigger>
                        <TabsTrigger value='theme' className='data-[state=active]:text-[#024DE3]'>主题配色</TabsTrigger>
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
                        <Label>{'赵光晶范大哥'}</Label>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    </div>
}