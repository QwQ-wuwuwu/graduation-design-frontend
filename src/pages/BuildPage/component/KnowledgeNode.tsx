import { memo, useEffect, useState } from "react"
import { Handle, Position } from "@xyflow/react"
import { getList } from "@/request/API/knowledge"
import { useAssistant } from "@/store/flowNode"
import SearchCheckbox from "@/components/my-ui/SearchCheckbox"

function KnowledgeNode({ data, isConnectable }: { data: any, isConnectable : boolean }) {

    const [list, setList] = useState([])
    const { assistant, setAssistant} = useAssistant()

    const handleSearchSelectOpen = async () => {
        const { data: { data } } = await getList()
        let copyData = data
        if (assistant.knowledge_ids) {
            const owners = assistant.knowledge_ids.split(',').map((d: any) => Number(d))
            copyData = data.map((d: any) => ({
                ...d,
                checked: owners.includes(d.id)
            }))
        }
        setList(copyData)
    }

    useEffect(() => {
        handleSearchSelectOpen()
    }, [])

    const handleKnowledgeSelect = (value: any[]) => {
        setAssistant({
            ...assistant,
            knowledge_ids: value.join(',')
        })
    }

    return <div className='flex justify-center items-center w-[350px] h-[200px] group'>
        <Handle
            type="target"
            position={Position.Left}
            style={{ background: '#024DE3' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
        />
        <div className='m-2 border group-hover:border group-hover:border-[#024DE3] w-full h-full bg-[#F7F8FB] rounded-lg text-center text-sm p-2 space-y-2'>
            <span className="text-gray-500 font-bold">知识库{data.label}</span>
            <SearchCheckbox 
                data={list}
                onSelect={handleKnowledgeSelect}
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