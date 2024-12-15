import Sidebar from "./Sidebar"
import ChatWhithModel from "./ChatWithModel"
import IndexView from "./IndexView"

export default function ChatPage() {
    return <div className="h-full w-full flex">
        <Sidebar />
        {/* <ChatWhithModel className="w-[calc(100%-220px)] relative h-full" /> */}
        <IndexView />
    </div>
}