import { memo } from "react"
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

function ModelConfigNode({ data, isConnectable }: { data: any, isConnectable : boolean }) {

    const tasks = [{id:1, name:'任务1'},{id:2, name:'任务2'},{id:3, name:'任务3'}]

    return <div className='flex justify-center items-center w-[400px] h-[300px] group'>
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
                <SearchSelect selectValue="选择助手核心任务" list={tasks} onSelect={() => console.log('')} />
            </div>
            <div className="mt-4 space-y-2">
                <p className="text-gray-500 font-bold">温度</p>
                <div className="flex space-x-2">
                    <Slider className=" data-[range]-bg-[blue]" step={1} defaultValue={[95]} />
                    <Input type="number" value={0.95} className="w-[100px] bg-[#FAFCFF] text-gray-600" />
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
                <Input type="number" value={3200} className="bg-[#FAFCFF] text-gray-600" />
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