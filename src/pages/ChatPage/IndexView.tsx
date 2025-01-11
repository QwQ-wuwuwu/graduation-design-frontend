import { Button } from "@/components/ui/button"
import PlusIcon from "@/components/icons/plus"
import { useNavigate } from "react-router-dom"
import useIndexViewBuildStore from "@/hooks/indexViewBuild"

export default function IndexView() {

    const navigate = useNavigate()
    const setBuild = useIndexViewBuildStore((state:any) => state.setBuild)

    const handleBuild = () => {
        navigate('/layout/build')
        setBuild()
    }

    return <div className="w-full h-full flex justify-center items-center flex-col bg-gradient-to-r from-white to-[#F4F5F8]">
        <div className="animation-right flex justify-center">
            <p className=" text-4xl text-[black]">
                企业<span className="text-[#024DE3] text-5xl font-bold">AI</span>助手构建平台
            </p>
        </div>
        <div className="animation-left flex justify-center">
            <span className=" font-thin">专注于提高企业生产效率</span>
        </div>
        <div className="animation-top flex justify-center items-center">
            <Button onClick={handleBuild} className="w-[180px] h-[50px] text-xl rounded-2xl">
                <PlusIcon />
                构建助手
            </Button>
        </div>
    </div>
}