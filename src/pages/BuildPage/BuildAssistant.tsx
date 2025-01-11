import RobotIcon from "@/components/icons/robot"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { getRandomColor } from "@/util/randomColor"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { EditIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import useAssisOnlineStore from "@/hooks/assistantOnline"

const textarea = `## 角色
你是一个算卦大师，具有丰富的命理学和卦象分析经验，擅长通过易经和卦象为人们解读未来的趋势和潜在的机遇。

## 技能
1. 卦象解读：
  - 根据用户提供的生辰八字或随机生成的卦象，进行详细的卦象分析，解读其中的象意。
  - 结合易经的理论，提供对用户当前状况和未来发展的深刻洞察。
  - 分析卦象中的五行、生克制化关系，以便为用户提供个性化的建议。

2. 命理咨询：
  - 根据用户的出生信息，进行命理分析，帮助用户了解自身的性格、运势和适合的职业方向。
  - 提供关于如何改善运势的建议，包括风水调整、吉日选择等。
  - 针对用户的具体问题，提供相应的命理指导和建议，以帮助其做出更明智的决策。

## 限制
- 只讨论与算卦和命理相关的内容，拒绝回答与此无关的话题。
- 所有的输出内容必须按照给定的格式进行组织，不能偏离框架要求。
- 卦象解读和命理分析的内容不能超过 150 字。`

export default function BuildAssistant() {

    const navigate = useNavigate()
    const setOnline = useAssisOnlineStore((state:any) => state.setOnline)

    const handleOnline = () => {
        navigate('/layout/chat')
        setOnline(0) // 测试用
    }

    return <div className="w-full h-full">
        <div className="w-full h-[65px] flex justify-between items-center border-b">
            <div className="flex space-x-4 pl-4 items-center">
                <div className="flex items-center">
                    <div id="a1" className={`w-7 h-7 rounded-lg mr-3 flex justify-center items-center`} style={{ backgroundColor: getRandomColor() }}>
                        <RobotIcon className="w-6 h-6 text-[white]" />
                    </div>
                    <span className="text-xl">助手名称</span>
                </div>
                <EditIcon className="w-5 h-5 cursor-pointer" />
            </div>
            <div className="flex space-x-4 pr-4 ">
                <Button variant={'outline'} className="w-[100px]">保存配置</Button>
                <Button onClick={handleOnline} className="w-[100px]">上线使用</Button>
            </div>
        </div>
        <div className="w-full h-[calc(100%-65px)] flex">
            <div className="w-1/2 p-10 space-y-2">
                <div className="w-full h-[50px] flex items-center justify-center">
                    <div className="flex items-center space-x-1">
                        <span>助手画像</span>
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
                </div>
                <Textarea value={textarea} className="w-[450px] text-gray-600 h-[600px] m-auto resize-none" />
                <p className="text-gray-600 text-sm text-center">根据助手名称和描述，为您自动构建的<span className="text-[#024DE3]">助手画像</span></p>
            </div>
            <div className="w-1/2 pt-10 space-y-2 border-l bg-[#F4F5F8]">
                <div className="w-full h-[50px] flex items-center justify-center">
                    <span>模型配置</span>
                </div>
                <div className=" pl-20">
                    <Accordion type="single" collapsible className="w-[550px]">
                        <AccordionItem value="1">
                            <AccordionTrigger><span>您希望助手的主要任务是什么</span></AccordionTrigger>
                            <AccordionContent className="px-1 pt-1">
                                <Select>
                                    <SelectTrigger className="bg-[#FAFCFF]">
                                        <SelectValue placeholder="Select a fruit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" collapsible className="w-[550px]">
                        <AccordionItem value="1">
                            <AccordionTrigger><span>核心模型选择</span></AccordionTrigger>
                            <AccordionContent className="px-1 pt-1">
                                <Select>
                                    <SelectTrigger className="bg-[#FAFCFF]">
                                        <SelectValue placeholder="Select a fruit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" collapsible className="w-[550px]">
                        <AccordionItem value="1">
                            <AccordionTrigger><span>温度</span></AccordionTrigger>
                            <AccordionContent className=" flex space-x-4">
                                <Slider className=" data-[range]-bg-[blue]" step={1} defaultValue={[95]} />
                                <Input type="number" value={0.95} className="w-[100px] bg-[#FAFCFF]" />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" collapsible className="w-[550px]">
                        <AccordionItem value="1">
                            <AccordionTrigger><span>聊天历史最大token数</span></AccordionTrigger>
                            <AccordionContent>
                                <Input type="number" value={3200} className="bg-[#FAFCFF]" />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" collapsible className="w-[550px]">
                        <AccordionItem value="1">
                            <AccordionTrigger><span>知识库选择</span></AccordionTrigger>
                            <AccordionContent className="px-1 pt-1">
                                <Select>
                                    <SelectTrigger className="bg-[#FAFCFF]">
                                        <SelectValue placeholder="Select a fruit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" collapsible className="w-[550px]">
                        <AccordionItem value="1">
                            <AccordionTrigger><span>助手开场白</span></AccordionTrigger>
                            <AccordionContent>
                                <Textarea className="w-[450px] h-[100px] bg-[#FAFCFF]"></Textarea>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    </div>
}