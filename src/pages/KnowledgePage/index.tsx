import SearchInput from "@/components/my-ui/SearchInput"
import { Button } from "@/components/ui/button"
import { Outlet } from "react-router-dom"
import { useLocation } from "react-router-dom"
import DocCreate from "./DocCreate"
import { useMemo, useState } from "react"
import QACreate from "./QACreate"
import { 
    useDocKnowledgeStore, 
    useQAKnowledgeStore,
    useKnowDetailStore
 } from '@/store/knowledge'
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom"
import { EditIcon } from "lucide-react"
import DropFile from "@/components/my-ui/DropFile"
import { deepseekTest } from "@/request/API/knowledge"

export default function KnowledgePage() {

    const location = useLocation()
    const [DocOpen, setDocOpen] = useState(false)
    const [QAOpen, setQAOpen] = useState(false)
    const [DropOpen, setDropOpen] = useState(false)
    const loadDocList = useDocKnowledgeStore((state:any) => state.loadDocList)
    const loadQAList = useQAKnowledgeStore((state:any) => state.loadQAList)
    const knowledge = useKnowDetailStore((state:any) => state.knowledge)

    const handleCreate = () => {
        if(location.pathname === '/layout/knowledge/doc' || location.pathname === '/layout/knowledge') {
            setDocOpen(true)
            return 
        }
        setQAOpen(true)
    }

    const handleDocCreate = async () => {
        setDocOpen(false)
        loadDocList()
    }

    const handleQACreate = async () => {
        loadQAList()
        setQAOpen(false)
    }

    const handleTest = async () => {
        await deepseekTest()
    }

    const Header = useMemo(() => {
        const paths = location.pathname.split('/')
        if(paths.includes('doclib')) {
            return <div className="w-full h-12 flex justify-between items-center">
                <div className="h-full space-x-4 flex items-center">
                    <div className=" rounded-full w-10 h-10 border flex justify-center items-center">
                        <Link to={'/layout/knowledge/doc'}><ArrowLeft className="w-6 h-6 cursor-pointer" /></Link>
                    </div>
                    <p className="font-bold text-sm">{knowledge.name}</p>
                    <EditIcon className="w-5 h-5 cursor-pointer" />
                </div>
                <div className="h-full flex justify-end space-x-4 items-center">
                    <SearchInput placeholder="搜索文件名称" />
                    <Button onClick={() => setDropOpen(true)} className="w-[100px]">上传文件</Button>
                </div>
            </div>
        }
        if(paths.includes('qalib')) {
            return <div className="w-full h-12 flex justify-between items-center">
                <div className="h-full space-x-4 flex items-center">
                    <div className=" rounded-full w-10 h-10 border flex justify-center items-center">
                        <Link to={'/layout/knowledge/qa'}><ArrowLeft className="w-6 h-6 cursor-pointer" /></Link>
                    </div>
                    <p className="font-bold text-sm">{knowledge.name}</p>
                    <EditIcon className="w-5 h-5 cursor-pointer" />
                </div>
                <div className="h-full flex justify-end space-x-4 items-center">
                    <SearchInput placeholder="搜索QA内容" />
                    <Button className="w-[100px]">创建QA</Button>
                </div>
            </div>
        }
        return <div className=" w-full h-12 flex justify-end space-x-4 items-center">
            <SearchInput placeholder="知识库名称" />
            <Button onClick={handleCreate} className="w-[150px]">创建知识库</Button>
            {/* <Button onClick={handleTest}>test</Button> */}
        </div>
    }, [location.pathname, knowledge])

    return <div className="w-full h-full p-2">
        {Header}
        <div className="w-full h-[calc(100%-48px-64px)] overflow-y-auto my-scrollbar">
            <Outlet />
        </div>
        {!(location.pathname.includes('doclib') || location.pathname.includes('qalib')) && 
        <div className=" w-full h-16 flex items-center">
            <p className="text-sm text-gray-500">知识库集合. </p>
        </div>}
        <DocCreate open={DocOpen} onCancel={() => setDocOpen(false)} onConform={handleDocCreate} />
        <QACreate open={QAOpen} onCancel={() => setQAOpen(false)} onConform={handleQACreate} />
        <DropFile open={DropOpen} onClose={() => setDropOpen(false)} onUpload={() => {}} />
    </div>
}