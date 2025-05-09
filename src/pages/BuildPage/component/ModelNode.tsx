import { memo, useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import ModelIcon from '@/components/icons/model';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getModelList } from '@/request/API/model';
import { useAssistant, useModelTask } from '@/store/flowNode';

function ModelNode({ data, isConnectable }: { data: any, isConnectable: boolean }) {

    const [list, setList] = useState([]);
    // 有点多余了
    const setModel = useModelTask((state: any) => state.setModel);
    const { assistant, setAssistant } = useAssistant()

    useEffect(() => {
        async function loadModelList() {
            const { data: { data } } = await getModelList();
            setList(data)
        }
        loadModelList()
    }, [])

    const handleValueChange = async (value: string) => {
        // @ts-ignore
        const modelId = list.find((model: any) => model.name === value)?.id
        setModel(parseInt(modelId))
        setAssistant({ ...assistant, model_id: modelId, model_name: value })
    }

    return <div className='flex justify-center items-center w-[250px] h-[250px]'>
        <Handle
            type="source"
            position={Position.Right}
            style={{ background: '#024DE3' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
        />
        <div className='m-2 p-2 flex flex-col items-center w-[240px] h-[240px] bg-white border rounded-lg'>
            <div className="w-full flex justify-center">
                <p className="text-gray-500 text-md font-bold">基准模型{data.label}</p>
            </div>
            <ModelIcon className='w-[150px] h-[150px] text-blue-600' />
            <div className='w-full'>
                <Select defaultValue={assistant.model_name || ''} onValueChange={handleValueChange}>
                    <SelectTrigger>
                        <SelectValue placeholder='选择模型' className='bg-white' />
                    </SelectTrigger>
                    <SelectContent>
                        {list.map((model: any) => (
                            <SelectItem value={model.name} key={model.id}>{model.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    </div>
}

export default memo(ModelNode)