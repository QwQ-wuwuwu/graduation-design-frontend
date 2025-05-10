import { ChangeEvent, memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Textarea } from '@/components/ui/textarea';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { useAssistant, useModelTask } from '@/store/flowNode';

const textarea = `模型画像示例：
## 角色\n你是一位专业的xxx，致力于xxx。
你精通xxx，能够熟练使用xxx。
\n## 技能\n1. **xxx**：\n - xxxxxx。\n2. **xxx**：\n - xxxxxx。\n\n## 限制\n- 只讨论与xxx相关的内容，避免涉及其他领域的技术或问题。
\n- 所有输出内容需按照给定的格式组织，不得偏离框架要求。`

function PortraitNode({ data, isConnectable }: { data: any, isConnectable : boolean }) {

    const { assistant, setAssistant } = useAssistant()

    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setAssistant({ ...assistant, portrait: value })
    }
    
    return <div className='flex justify-center items-center w-[480px] h-[400px] group'>
        <Handle
            type="target"
            position={Position.Left}
            style={{ background: '#024DE3' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            isConnectable={isConnectable}
        />
        <div className='m-2 border group-hover:border group-hover:border-[#024DE3] w-full h-full bg-[#F7F8FB] rounded-lg text-sm p-2 space-y-2'>
            <div className='flex items-center space-x-1 justify-center'>
                <span className='text-gray-500 font-bold'>模型画像{data.label}</span>
                <TooltipProvider delayDuration={200}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <QuestionMarkCircledIcon className=" cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#024DE3]">
                            <p>助手画像仅作为参考，如您有更好的想法可替换掉</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Textarea onChange={handleTextAreaChange} placeholder={textarea} 
                value={assistant.portrait || textarea}
                className='text-gray-600 w-[460px] h-[340px] my-scrollbar'  
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

export default memo(PortraitNode);
