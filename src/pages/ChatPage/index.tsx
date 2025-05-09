import Sidebar from "./Sidebar"
import ChatWhithModel from "./ChatWithModel"
import IndexView from "./IndexView"
import { useState } from "react"

const initialData = {
    id: -1,
    name: "",
    avatar: "",
}

export default function ChatPage() {

    const [chat, setChat] = useState(false)
    const [assistant, setAssistant] = useState(initialData);
    const [show, setShow] = useState(false)

    const handleSelect = (assist: any) => {
        setChat(true)
        setAssistant(assist)
    }

    return <div className="h-full w-full flex">
        {show && <Sidebar onSelect={handleSelect} onShow={() => setShow(true)} />}
        {chat ? <ChatWhithModel assistant={assistant} className="w-[calc(100%-220px)] relative h-full" /> : <IndexView />}
    </div>
}