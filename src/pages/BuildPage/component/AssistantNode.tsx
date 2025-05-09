import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import RobotIcon from '@/components/icons/robot';
import { useAssistant } from '@/store/flowNode';

function AssistantNode({ data }: { data: any }) {

    const { assistant, setAssistant } = useAssistant();

    return <div className='flex flex-col justify-center items-center w-[100px] h-[100px]'>
        <Handle
            type="target"
            position={Position.Left}
            style={{ background: '#024DE3' }}
            onConnect={(params) => console.log('handle onConnect', params)}
        />
        <p className='text-gray-500 text-md font-bold'>AI助手{data.label}</p>
        <div style={{ backgroundColor: assistant.avatar }}
            className='m-2 bg-green-500 rounded-xl'>
            <RobotIcon className='w-[90px] h-[90px] text-[white]' />
        </div>
    </div>
}

export default memo(AssistantNode);