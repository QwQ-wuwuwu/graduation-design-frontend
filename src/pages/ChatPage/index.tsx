import Sidebar from "./Sidebar"
import ChatWhithModel from "./ChatWithModel"
import IndexView from "./IndexView"
import { useEffect, useState } from "react"
import { getOnlineAssistants } from "@/request/API/assistant"

const initialData = {
    id: -1,
    name: "",
    avatar: "",
}

export default function ChatPage() {

    const [chat, setChat] = useState(false)
    const [assistant, setAssistant] = useState(initialData);
    const [show, setShow] = useState(false)
    const [onlines, setOnlines] = useState<any[]>([])

    useEffect(() => {
        getOnlineAssistants().then((res: any) => {
            const list = res.data.data
            if (list.length > 0) {
                setShow(true)
                setOnlines(list)
            }
        })
    }, [])

    const handleSelect = (assist: any) => {
        setChat(true)
        setAssistant(assist)
    }

    return <div className="h-full w-full flex">
        {show && <Sidebar onSelect={handleSelect} onlines={onlines} />}
        {chat ? <ChatWhithModel assistant={assistant} className="w-[calc(100%-220px)] relative h-full" /> : <IndexView />}
    </div>
}