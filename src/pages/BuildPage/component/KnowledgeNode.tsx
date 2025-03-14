import { memo, useState } from "react"
import { Handle, Position } from "@xyflow/react"
import SearchSelect from "@/components/my-ui/SearchSelect"
import { getList } from "@/request/API/knowledge"
import { useAssistant } from "@/store/flowNode"

function KnowledgeNode({ data, isConnectable }: { data: any, isConnectable : boolean }) {

    const [list, setList] = useState([])
    const { assistant, setAssistant} = useAssistant()

    const handleSearchSelectOpen = async () => {
        const { data: { data } } = await getList()
        setList(data)
    }

    const handleKnowledgeSelect = (value: string) => setAssistant({ ...assistant, knowledge_ids: value })

    return <div className='flex justify-center items-center w-[350px] h-[100px] group'>
        <Handle
            type="target"
            position={Position.Left}
            style={{ background: '#024DE3' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
        />
        <div className='m-2 border group-hover:border group-hover:border-[#024DE3] w-full h-full bg-[#F7F8FB] rounded-lg text-center text-sm p-2 space-y-2'>
            <span className="text-gray-500 font-bold">知识库{data.label}</span>
            <SearchSelect 
                list={list} 
                selectValue="选择知识库" 
                onSelect={handleKnowledgeSelect}
                onOpen={handleSearchSelectOpen} 
            />
        </div>
        <Handle
            type="source"
            position={Position.Right}
            style={{ background: '#024DE3' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
        />
    </div>
}

export default memo(KnowledgeNode)