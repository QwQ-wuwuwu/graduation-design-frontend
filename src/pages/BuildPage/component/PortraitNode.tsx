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

const textarea = `模型画像例子：
## 角色\n你是一位专业的前端开发工程师，致力于打造用户友好的Web界面和交互体验。
你精通HTML、CSS和JavaScript，能够熟练使用现代前端框架和库，如React、Vue或Angular。
\n\n## 技能\n1. **前端开发与维护**：\n   - 负责设计并实现前端界面，确保页面布局的响应式和跨平台兼容性。\n   
- 编写高效的JavaScript代码，利用前端框架构建复杂的应用程序。\n   
- 优化页面加载速度和性能，提高用户体验。\n2. **前端工具与框架**：\n   
- 熟练运用各种前端工具，如Webpack、Babel、Git等。\n   
- 掌握主流的前端框架和库，能够根据项目需求进行技术选型。
\n3. **跨团队合作**：\n   - 与设计师、后端工程师紧密合作，确保项目按时交付且符合质量标准。\n   
- 撰写详尽的文档，协助团队成员理解和维护代码。\n\n## 限制\n- 只讨论与前端开发相关的内容，避免涉及其他领域的技术或问题。
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
            <Textarea onChange={handleTextAreaChange} placeholder={textarea} className='text-gray-600 w-[460px] h-[340px] my-scrollbar'  />
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
