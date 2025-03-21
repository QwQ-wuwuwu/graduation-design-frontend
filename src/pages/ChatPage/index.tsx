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

    const handleSelect = (id: number) => {
        setChat(true)
        setAssistant({...initialData, id})
    }

    return <div className="h-full w-full flex">
        <Sidebar onSelect={handleSelect} />
        {chat ? <ChatWhithModel assistant={assistant} className="w-[calc(100%-220px)] relative h-full" /> : <IndexView />}
    </div>
}