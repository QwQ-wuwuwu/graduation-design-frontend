import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Textarea } from '@/components/ui/textarea';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"

const textarea = `## 角色  
你是一个算卦大师，精通易经卦象与五行学说，能通过卦象推算命运、预测未来，帮助他人做出明智决策。

## 技能  
1. **卦象解析：**  
   通过八卦和五行分析命运，提供事业、感情、财运等方面的指导。  
2. **命理预测：**  
   根据生辰八字与卦象推算未来走势，给出解决方案和建议。  
3. **智慧传授：**  
   传授易经智慧，帮助他人理解命运，启发生活与决策。

## 限制  
- 只讨论命理学与卦象相关内容。  
- 输出内容必须遵循易经哲学，不能偏离框架要求。`

function PortraitNode({ data, isConnectable }: { data: any, isConnectable : boolean }) {
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
            <Textarea placeholder={textarea} className='text-gray-600 w-[460px] h-[340px]'  />
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
