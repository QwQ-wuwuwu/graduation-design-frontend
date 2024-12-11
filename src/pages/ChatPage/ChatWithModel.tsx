import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import ArrowUpIcon from "@/components/icons/ArrowUp"
import { useEffect, useRef, useState } from "react"
import { chatWithModel } from "@/request/model_api/chat"
import AttachedIcon from "@/components/icons/attached"
import WebIcon from "@/components/icons/web"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"
import StopIcon from "@/components/icons/stop"
import ArrowDownIcon from "@/components/icons/arrowDown"

export default function ChatWhithModel({ className }: { className?: string }) {

    const [input, setInput] = useState('')
    const user = useRef(JSON.parse(sessionStorage.getItem('user') as string))
    const bottomRef = useRef<HTMLDivElement>(null) 
    const scorllareaRef = useRef<HTMLDivElement>(null) // 监听滚动区域
    const inputref = useRef<HTMLTextAreaElement>(null)
    const [timeId, setTimeId] = useState<any>(null)
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            !entry.isIntersecting ? setIsShow(true) : setIsShow(false)
        }, {
            root: scorllareaRef.current,
            rootMargin: '0px',
            threshold: 1.0  // 目标元素完全进入视口时触发
        })
        if(bottomRef.current) {
            observer.observe(bottomRef.current)
        }
        return () => {
            observer.disconnect() // 停止全部监听
            // bottomRef.current && observer.unobserve(bottomRef.current) // 停止监听某个元素
        }
    }, [])

    const handleTextareaInput = (e:any) => {
        const textarea = e.target
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight}px`
        setInput(textarea.value)
    }

    const [messages, setMessages] = useState([
        { type: 'model', content: '自动调整高度：最常用的方式是使用 JavaScript（纯 JavaScript 或 React），通过 textarea.scrollHeight 动态设置高度。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'user', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: '在现代浏览器中，textarea 的高度可以通过 min-height 和 max-height 来控制，虽然它不会完全随着内容高度变化，但能在一定范围内保持弹性。' },        
        ])

    const handleClick = () => {
        if(!input.trim()) return
        const tempInput = input.trim()
        const data = JSON.stringify({
            "model": "qwen-plus-latest",
            "messages": [
               {
                  "role": "system",
                  "content": "你是智酱，是由智匠MindCraft开发的智能机器人，你是人类的好朋友，帮助他们解决各种问题。"
               },
               {
                  "role": "user",
                  "content": `${tempInput}`
               }
            ],
            "temperature": 0.2,
            "max_tokens": 2000,
            "stream": false,
            "web_search": false
        });
        setMessages([...messages,{ type: 'user', content: tempInput}, { type: 'model', content: '' }])
        setInput('')
        chatWithModel(data).then(res => {
            const result = res.data.choices[0].message.content
            let index = 0, str = ''
            let randomNum = Math.floor(Math.random() * 10 + 1)
            const id = setInterval(() => {
                str += result.slice(index, index + randomNum)
                index += randomNum
                randomNum = Math.floor(Math.random() * 10 + 1)
                setMessages(pre => pre.map((msg, i) => i === pre.length - 1 ? { ...msg, content: str } : msg))
                if(index >= result.length - 1) {
                    clearInterval(id)
                    setTimeId(null)
                }
            }, 100)
            setTimeId(id)
        }, () => {
            setMessages(pre => [...pre,{ type: 'user', content: tempInput}, { type: 'model', content: '哎呦~网络似乎出了点小问题呢' }])
        })
    }

    const handleKeydown = (e:any) => {
        if(e.ctrlKey && e.key === 'Enter') {
            handleClick()
        }
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) // 自动聚焦会话页面底部
    }, [messages])

    return <div className={cn(className, '')}>
        <div ref={scorllareaRef} className={`w-[800px] min-w-[700px] rounded-lg pt-2 pb-[100px] h-[calc(100%-85px-38px)] scrollbar-hide overflow-y-auto m-auto`}>
            {messages.map((message, index) => (
                message.type === 'model' 
                ? <div key={index} className="flex justify-start mb-8">
                    <div className="w-[40px] h-[40px] text-center min-w-[40px] rounded-full bg-[#111111]">
                        <span className=' text-[11px] text-white font-[550] leading-[40px]'>{'大模型'}</span>
                    </div>
                    <div className="bg-[#F5F6F8] max-w-[700px] p-2 rounded-lg ml-2">
                        {message.content === '' ? '正在思考中...' : message.content}
                    </div>
                </div>
                : <div key={index} className="flex justify-end mb-8">
                    <div className="bg-[#EEF2FF] max-w-[700px] p-2 rounded-lg mr-2">{message.content}</div>
                    <div className="w-[40px] h-[40px] text-center min-w-[40px] rounded-full bg-[#024DE3]">
                        <span className=' text-[11px] text-white font-[550] leading-[40px]'>{user.current.name}</span>
                    </div>
                </div>
            ))}
            <div ref={bottomRef}></div>
        </div>
        <div className="w-[700px] min-w-[700px] absolute bottom-0 left-[50%] translate-x-[-50%]">
            {isShow && <div className="w-10 h-10 rounded-lg mb-3 relative top-0 left-[50%] bg-white translate-x-[-50%] flex justify-center items-center cursor-pointer">
                {/* @ts-ignore */}
                <ArrowDownIcon onClick={() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' })} />
            </div>}
            <Textarea ref={inputref} placeholder={`给"助手"发送消息`} onInput={handleTextareaInput} value={input}
                onKeyDown={handleKeydown}
                className="min-h-[85px] max-h-[200px] resize-none scrollbar-hide bg-[#F4F4F4] placeholder:text-[18px] pb-[40px]">
            </Textarea>
            <div className="w-[680px] h-[35px] bg-[#F4F4F4] relative top-[-36.5px] left-[50%] translate-x-[-50%] flex justify-between items-center">
                <div className="flex space-x-4">
                    <TooltipProvider delayDuration={500}>
                        <Tooltip>
                            <TooltipTrigger>
                                <AttachedIcon className="w-[22px] h-[22px] hover:bg-white hover:text-gray-500 rounded-lg cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-[black]">
                                <Label>附加文件</Label>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider delayDuration={500}>
                        <Tooltip>
                            <TooltipTrigger>
                                <WebIcon className="w-6 h-6 hover:bg-white hover:text-gray-500 rounded-lg cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-[black]">
                                <Label>联网搜索</Label>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="hover:text-gray-500 bg-white rounded-lg">
                    {timeId 
                    // @ts-ignore
                    ? <StopIcon onClick={() => {clearInterval(timeId); setTimeId(null)}} className="w-6 h-6 cursor-pointer" />
                    // @ts-ignore
                    : <ArrowUpIcon onClick={handleClick} className="w-6 h-6 cursor-pointer" />}
                </div>
            </div>
            <p className="text-center text-[#5D5D5D] pb-2 min-w-[700px] mt-[-30px] text-sm">智能大模型 也可能会犯错。请核查重要信息。</p>
        </div>
    </div>
}