import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Textarea } from '@/components/ui/textarea';
import { useAssistant } from '@/store/flowNode';

function PortraitNode({ data, isConnectable }: { data: any, isConnectable : boolean }) {

    const { assistant, setAssistant } = useAssistant()

    const handleChange = (e: any) => setAssistant({ ...assistant, guide_word: e.target.value })

    return <div className='flex justify-center items-center w-[350px] h-[120px] group'>
        <Handle
            type="target"
            position={Position.Left}
            style={{ background: '#024DE3' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
        />
        <div className='m-2 border group-hover:border group-hover:border-[#024DE3] w-full h-full bg-[#F7F8FB] rounded-lg text-center text-sm p-2 space-y-2'>
            <span className='text-gray-500 font-bold'>模型开场白</span>
            <Textarea onChange={handleChange} className='text-gray-600' placeholder={data.label} />
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

export default memo(PortraitNode);
