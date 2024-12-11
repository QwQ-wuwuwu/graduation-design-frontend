import Sidebar from "./Sidebar"
import ChatWhithModel from "./ChatWithModel"

export default function ChatPage() {
    return <div className="h-full w-full flex">
        <Sidebar />
        <ChatWhithModel className="w-[calc(100%-220px)] relative min-w-[500px] h-full" />
    </div>
}