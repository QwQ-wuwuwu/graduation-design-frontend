import Sidebar from "./Sidebar"
import ChatWhithModel from "./ChatWithModel"
import IndexView from "./IndexView"
import { useState } from "react"

export default function ChatPage() {

    const [chat, setChat] = useState(false)

    return <div className="h-full w-full flex">
        <Sidebar onSelect={(id) => setChat(true)} />
        {chat ? <ChatWhithModel className="w-[calc(100%-220px)] relative h-full" /> : <IndexView />}
    </div>
}