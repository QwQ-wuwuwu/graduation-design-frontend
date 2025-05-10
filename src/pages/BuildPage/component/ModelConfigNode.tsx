import { memo, useEffect, useState } from "react"
import { Handle, Position } from "@xyflow/react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import SearchSelect from "@/components/my-ui/SearchSelect"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useAssistant, useModelTask } from "@/store/flowNode"
import { getTasks, getTaskByModel } from "@/request/API/api"

const answerStyleList: { id: number, name: string, explain: string}[] = [
    { id: 1, name: "strict", explain: '严谨' },
    { id: 2, name: "moderate", explain: '适中' },
    { id: 3, name: "flexible", explain: '发散' },
    { id: 4, name: "custom", explain: '自定义' },
];

function ModelConfigNode({ data, isConnectable }: { data: any, isConnectable : boolean }) {

    const [tasks, setTasks] = useState([])
    const modelId: number = useModelTask((state: any) => state.modelId);
    const { assistant, setAssistant } = useAssistant()
    const [ temperature, setTemperature ] = useState(assistant.temperature ? assistant.temperature * 100 : 95)
    const [ maxToken, setMaxToken ] = useState(assistant.max_token || 3072)
    const [ paramDesc, setParamDesc ] = useState(assistant.param_desc || 'custom')

    useEffect(() => {
        console.log('assistant', assistant)
    }, [])

    const handleSearchSelectOpen = async () => {
        if(modelId === -1) {
            const { data: { data } } = await getTasks()
            setTasks(data.map((d: any) => ({...d, name: d.task_name})))
        } else {
            const { data: { data } } = await getTaskByModel(modelId)
            setTasks(data.map((d: any) => ({...d, name: d.task_name})))
        }
    }

    useEffect(() => {
        handleSearchSelectOpen()
    }, [])

    const handleTaskSelect = (value: string) => {
        const task: any = tasks.find((task: any) => task.name === value)
        setAssistant({ ...assistant, task_name: value, api_id: task.id })
    }

    const handleMaxTokenInput = (e: any) => {
        setMaxToken(e.target.value)
        setAssistant({ ...assistant, max_token: e.target.value })
    }

    const handleTemperatureInput = (value: number[]) => setAssistant({ ...assistant, temperature: value[0] / 100 })

    return <div className='flex justify-center items-center w-[400px] h-[370px] group'>
        <Handle
            type="target"
            position={Position.Left}
            style={{ background: '#024DE3' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
        />
        <div className='border group-hover:border group-hover:border-[#024DE3] m-2 w-full h-full bg-[#F7F8FB] rounded-lg text-sm p-2'>
            <div className="w-full flex justify-center">
                <p className="text-gray-500 text-md font-bold">模型配置{data.label}</p>
            </div>
            <div className="mt-4 space-y-2">
                <p className="text-gray-500 font-bold">核心任务</p>
                <Select defaultValue={assistant.task_name || ''} onValueChange={handleTaskSelect}>
                    <SelectTrigger>
                        <SelectValue placeholder='选择助手核心任务' className='bg-white' />
                    </SelectTrigger>
                    <SelectContent>
                        {tasks.map((task: any) => (
                            <SelectItem value={task.name} key={task.id}>{task.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="mt-4 space-y-2">
                <p className="text-gray-500 font-bold">模型采样温度</p>
                <div className="flex space-x-2">
                    <Slider className=" data-[range]-bg-[blue]" 
                        onValueCommit={handleTemperatureInput}
                        onValueChange={(val) => setTemperature(val[0])}
                        step={1} value={[temperature]}
                    />
                    <Input onChange={(e) => setTemperature(parseFloat(e.target.value) * 100)}
                        type="number" value={temperature / 100} 
                        className="w-[100px] bg-[#FAFCFF] text-gray-600" 
                    />
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-1">
                    <p className="text-gray-500 font-bold">聊天历史最大token数</p>
                    <TooltipProvider delayDuration={200}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <QuestionMarkCircledIcon className=" cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#024DE3]">
                                <p>通过此参数对聊天历史记录进行裁剪，控制发送给模型的历史消息数量，避免出现超长错误，因此不可大于模型支持的最大上下文长度</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <Input onChange={handleMaxTokenInput} 
                    type="number" value={maxToken} 
                    className="bg-[#FAFCFF] text-gray-600" 
                />
            </div>
            <div className="mt-4 space-y-2">
                <p className="text-gray-500 font-bold">回答风格</p>
                <div className='w-full'>
                    <Select defaultValue={assistant.param_desc || ''} onValueChange={(val) => setAssistant({ ...assistant, param_desc: val })}>
                        <SelectTrigger>
                            <SelectValue placeholder='选择回答风格' className='bg-white' />
                        </SelectTrigger>
                        <SelectContent>
                            {answerStyleList.map(model => (
                                <SelectItem value={model.name} key={model.id}>{model.explain}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
        <Handle
            type="source"
            position={Position.Right}
            style={{ background: '#024DE3' }}
            isConnectable={isConnectable}
        />
    </div>
}

export default memo(ModelConfigNode)