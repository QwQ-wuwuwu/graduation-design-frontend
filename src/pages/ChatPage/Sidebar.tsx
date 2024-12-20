import { useRef, useState } from "react"
import { getRandomColor } from "@/util/randomColor"
import SearchInput from "@/components/my-ui/SearchInput"
import RobotIcon from "@/components/icons/robot"

export default function Sidebar(
    { onSelect }: 
    { onSelect: (id: number) => void}) {

    const [assistants, setAssistants] = useState([
        { name: '助手一', id: 0, description: '你好啊', target: false },
        { name: '助手二', id: 1, description: '今天心情好吗今天心情好吗今天心情好吗今天心情好吗今天心情好吗今天心情好吗今天心情好吗', target: false },
        { name: '助手三', id: 2, description: '吃饭没', target: false },
        { name: '助手四', id: 3, description: '晚上好', target: false },
        { name: '助手四', id: 4, description: '晚上好', target: false },
        { name: '助手四', id: 5, description: '晚上好', target: false },
        { name: '助手四', id: 6, description: '晚上好', target: false },
        { name: '助手四', id: 7, description: '晚上好', target: false },
        { name: '助手四', id: 8, description: '晚上好', target: false },
        { name: '助手四', id: 9, description: '晚上好', target: false },
        { name: '助手四', id: 10, description: '晚上好', target: false },
        { name: '助手四', id: 11, description: '晚上好', target: false },
        { name: '助手四', id: 12, description: '晚上好', target: false },
        { name: '助手四', id: 13, description: '晚上好', target: false },
    ])
    const searchRef = useRef<HTMLInputElement>(null)

    const handleClick = (id: number) => {
        setAssistants(pre => pre.map((assistant) => assistant.id === id 
        ? { ...assistant, target: true } 
        : {...assistant, target: false}))
        onSelect(id)
    }

    const handleKeyDdown = (e: any) => {
        if (e.key === 'Enter') {
            console.log('Enter')
            searchRef.current?.blur()
        }
    }

    return <div className="h-full w-[220px] min-w-[220px] border-r flex flex-col items-center">
        <div className="pt-2 fixed bg-[white] h-[50px]">
            <SearchInput ref={searchRef} placeholder="搜索助手名称" onKeyDown={handleKeyDdown} />
        </div>
        <div className="flex flex-col items-center mt-[50px] overflow-y-auto scrollbar-hide">
            {assistants.map((assistant) => (
                <div key={assistant.id} onClick={() => handleClick(assistant.id)}
                style={{ backgroundColor: assistant.target ? '#EDEFF6' : '' }}
                className={`flex flex-col cursor-pointer hover:bg-[#EDEFF6] p-3 mt-2 w-[200px] h-[100px] bg-[#F9F9FC] rounded-lg`}>
                    <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-lg mr-3 flex justify-center items-center`} style={{ backgroundColor: getRandomColor() }}>
                            <RobotIcon className="w-5 h-5 text-[white]" />
                        </div>
                        <span className=" font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis">{assistant.name}</span>
                    </div>
                    <div className="text-[12px] pt-2 whitespace-nowrap overflow-hidden text-ellipsis">{assistant.description}</div>
                    <div className="text-[12px] pt-2 text-[#9CA3AF]">2024-12-14 20:45</div>
                </div>)
            )}
        </div>
    </div>
}