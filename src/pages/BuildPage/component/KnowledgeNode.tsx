import { memo } from "react"
import { Handle, Position } from "@xyflow/react"
import SearchSelect from "@/components/my-ui/SearchSelect"

function KnowledgeNode({ data, isConnectable }: { data: any, isConnectable : boolean }) {

    const knowledges = [{id:1, name:'知识库1'},{id:2, name:'知识库2'},{id:3, name:'知识库3'}]

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
            <SearchSelect list={knowledges} selectValue="选择知识库" onSelect={() => console.log('ddd')} />
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