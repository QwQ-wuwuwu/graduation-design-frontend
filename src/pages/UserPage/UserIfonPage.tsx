import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function UpdateUserInfo() {

    const navigate = useNavigate()

    const handleLoginout = () => {
        sessionStorage.clear()
        localStorage.clear()
        navigate('/', { replace: true })
    }

    return <div>
        <Button onClick={handleLoginout} variant={'destructive'} className="w-[150px]">退出登录</Button>
    </div>
}