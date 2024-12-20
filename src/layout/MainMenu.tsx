import { NavLink, Outlet } from "react-router-dom"
import ApplicationIcon from "@/components/icons/application"
import TechnologyIcon from "@/components/icons/technology"
import KnowledgeIcon from "@/components/icons/knowledge"
import ModelIcon from "@/components/icons/model"
import DatasetIcon from "@/components/icons/dataset"
import SystemIcon from "@/components/icons/system"
import EvaluationIcon from "@/components/icons/evaluation"
import PresetIcon from "@/components/icons/preset"
import TaskIcon from "@/components/icons/task"
import InterfaceIcon from "@/components/icons/interface"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { BookOpenIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function NavLinkButton({children, value, to, textClass}: 
    {children: React.ReactNode, value:string, to:string, textClass?:string}
) {
    return <NavLink to={to} className={({ isActive }) => isActive ? 'text-[#024DE3] bg-white w-[160px] rounded-lg' : ' '}>
        <div className={`w-[160px] h-[50px] flex space-x-4 justify-center items-center rounded-lg hover:bg-white hover:text-[#024DE3]`}>
            {children}
            <span className={cn("leading-[48px] w-[58px] text-[14px]", textClass)}>{value}</span>
        </div>
    </NavLink>
}

export default function MainMenu() {

    const user = JSON.parse(sessionStorage.getItem('user') as string)

    return <div className="bg-[#F4F5F8] w-full h-[calc(100%-65px)] flex">
        <div className="w-[184px] h-full">
            <div className=" pl-3 flex flex-col space-y-2">
                <NavLinkButton to="/layout/chat" value="会话" textClass="tracking-[14px]">
                    <ApplicationIcon className="w-8 h-8" />
                </NavLinkButton>
                <NavLinkButton to="/layout/build" value="构建" textClass="tracking-[14px]">
                    <TechnologyIcon className="w-8 h-8" />
                </NavLinkButton>
                <NavLinkButton to="/layout/knowledge" value="知识库">
                    <KnowledgeIcon className='w-8 h-8'/>
                </NavLinkButton>
                {user.role === 0 && <NavLinkButton to="/layout/preset" value="预置助手">
                    <PresetIcon className='w-8 h-8 p-[2px]'/>
                </NavLinkButton>}
                <NavLinkButton to="/layout/model" value="模型" textClass="tracking-[14px]">
                    <ModelIcon className='w-8 h-8'/>
                </NavLinkButton>
                {user.role === 0 && <NavLinkButton to="/layout/dataset" value="数据集">
                    <DatasetIcon className='w-8 h-8'/>
                </NavLinkButton>}
                {user.role === 0 && <NavLinkButton to="/layout/taskset" value="任务" textClass="tracking-[14px]">
                    <TaskIcon className='w-8 h-8 p-[2px]'/>
                </NavLinkButton>}
                <NavLinkButton to="/layout/evaluation" value="评测" textClass="tracking-[14px]">
                    <EvaluationIcon className='w-8 h-8'/>
                </NavLinkButton>
                {user.role === 0 && <NavLinkButton to="/layout/api" value="接口管理">
                    <InterfaceIcon className='w-8 h-8 p-[2px]'/>
                </NavLinkButton>}
                {user.role === 0 && <NavLinkButton to="/layout/system" value="系统" textClass="tracking-[14px]">
                    <SystemIcon className='w-8 h-8'/>
                </NavLinkButton>}
            </div>
            <div className=" absolute bottom-4 pl-2">
                <div className="flex space-x-3">
                    <div className='w-[78px] h-[72px] cursor-pointer border rounded-lg bg-white hover:bg-[#024DE3] hover:text-white flex flex-col justify-center items-center'>
                        <a href='https://github.com/QwQ-wuwuwu?tab=repositories'>
                            <GitHubLogoIcon className="w-6 h-6" />
                        </a>    
                        <span className="text-sm font-bold">Github</span>
                    </div>
                    <div className='w-[78px] h-[72px] border cursor-pointer hover:bg-[#024DE3] bg-white hover:text-white rounded-lg flex flex-col justify-center items-center'>
                        <a href=''>
                            <BookOpenIcon className="w-6 h-6" />
                        </a>
                        <span className="text-sm font-bold">帮助文档</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-[calc(100%-184px)] rounded-lg h-full bg-[#FFFFFF]">
            <Outlet />
        </div>
    </div>
}