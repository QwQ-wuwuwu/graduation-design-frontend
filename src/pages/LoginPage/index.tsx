import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import logoSrc from '@/assets/login-logo-small.png'
import bigLogoSrc from '@/assets/login-logo-big.png'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { BookOpenIcon } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { registerApi, loginApi } from '@/request/API/user'
import { encrypt } from '@/util/cryptoPwd'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const [register, setRegister] = useState(false)
    const nameRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const okPasswordRef = useRef<HTMLInputElement | null>(null)
    const { toast } = useToast()
    const navigate = useNavigate()
    let timeId: NodeJS.Timeout

    const handleLogin = async () => {
        const name = nameRef.current ? nameRef.current.value : ''
        const password = passwordRef.current ? passwordRef.current.value : ''
        if(!name) {
            nameRef.current?.focus()
            return toast({ variant: 'destructive', title: '登录失败', description: '用户名不能为空', duration: 2000 })
        }
        if(!password) {
            passwordRef.current?.focus()
            return toast({ variant: 'destructive', title: '登录失败', description: '密码不能为空', duration: 2000 })
        }
        loginApi(name, encrypt(password)).then((res:any) => {
            const data = res.data
            if(data.code === 400) return toast({ variant: 'destructive', title: '登录失败', description: data.message, duration: 2000 })
            data.token && sessionStorage.setItem('token', data.token)
            sessionStorage.setItem('user', JSON.stringify(data.data))
            navigate('/layout/chat')
        })
    }

    const handleRegister = async () => {
        const name = nameRef.current ? nameRef.current.value : ''
        const password = passwordRef.current ? passwordRef.current.value : ''
        const okPassword = okPasswordRef.current ? okPasswordRef.current.value : ''
        if(!name) {
            nameRef.current?.focus()
            return toast({ variant: 'destructive', title: '注册失败', description: '用户名不能为空', duration: 2000 })
        }
        if(!password) {
            passwordRef.current?.focus()
            return toast({ variant: 'destructive', title: '注册失败', description: '密码不能为空', duration: 2000 })
        }
        if(!okPassword) {
            okPasswordRef.current?.focus()
            return toast({ variant: 'destructive', title: '注册失败', description: '确认密码不能为空', duration: 2000 })
        }
        if(password !== okPassword) {
            if(passwordRef.current) passwordRef.current.value = ''
            if(okPasswordRef.current) okPasswordRef.current.value = ''
            passwordRef.current?.focus()
            return toast({ variant: 'destructive', title: '注册失败', description: '两次输入的密码不一致', duration: 2000 })
        }
        registerApi(name, encrypt(password)).then(res => {
            if(res.data.code === 200) {
                toast({ variant: 'default', title: '注册成功', description: '即将返回登录', duration: 2000 })
                timeId = setTimeout(() => {
                    setRegister(false)
                    if(passwordRef.current) passwordRef.current.value = ''
                }, 3000)
            } else {
                toast({ variant: 'destructive', title: '注册失败', description: res.data.message, duration: 2000 })
                if(nameRef.current) nameRef.current.value = ''
            }
        })
    }

    useEffect(() => {
        return clearTimeout(timeId)
    }, [])

    return <div className="h-full w-full">
        <div className="sm:w-[1280px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] sm:h-[720px] h-full flex border rounded-lg shadow-xl overflow-hidden">
            <div className="w-[420px] h-[704px] sm:block hidden">
                <img src={bigLogoSrc} alt="logo-big" className='w-full h-full mt-2 ml-2' />
            </div>
            <div className=' relative w-[852px] h-[704px] sm:px-[266px] px-[250px]'>
                <div className='mt-[68px] '>
                    <div className='w-[114px] h-[36px] m-auto mt-[140px]'>
                        <img src={logoSrc} alt="logo-small" />
                    </div>
                    <span className='block w-fit m-auto font-normal opacity-[50%] text-[14px] mt-[24px]'>
                        便捷，灵活，可靠的企业级大模型应用开发平台
                    </span>
                </div>
                <div className='mt-[68px] space-y-5'>
                    <div>
                        <Input ref={nameRef}
                        type='text' placeholder='用户名' 
                        autoCapitalize='none' autoCorrect='off' 
                        className='h-[48px] bg-slate-50'/>
                    </div>
                    <div>
                        <Input ref={passwordRef}
                        type='password' placeholder='密码' className='h-[48px] bg-slate-50'/>
                    </div>
                    {register && <div>
                        <Input ref={okPasswordRef}
                        type='password' placeholder='确认密码' className='h-[48px] bg-slate-50'/>
                    </div>}
                </div>
                <div className='mt-4'>
                    <div className='text-center'>
                        <a href="javascript:;" onClick={() => {
                            setRegister(!register)
                            if(nameRef.current && passwordRef.current && !register) {
                                nameRef.current.value = ''
                                passwordRef.current.value = ''
                            }
                        }}
                        className='text-blue-500 text-sm hover:underline'>
                            {!register && <span>没有账号？注册</span>}
                            {register && <span>已有账号，登录</span>}
                        </a>
                    </div>
                    {
                        !register ? 
                        <Button onClick={handleLogin} className=' h-[48px] w-full mt-[32px]'>登录</Button>
                        : <Button onClick={handleRegister} className=' h-[48px] w-full mt-[32px]'>注册</Button>
                    }
                </div>
                <div className=' absolute bottom-0 right-4'>
                    <div className='text-right flex items-center space-x-3'>
                        <span className='block w-fit font-normal opacity-[50%] text-[14px] mr-2'>v1.0.0</span>
                        <a href='https://github.com/QwQ-wuwuwu?tab=repositories'>
                            <GitHubLogoIcon className='w-[40px] h-[40px] border p-[10px] rounded-lg'/>
                        </a>
                        <a href=''>
                            <BookOpenIcon className='w-[40px] h-[40px] border p-[10px] rounded-lg'/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
}