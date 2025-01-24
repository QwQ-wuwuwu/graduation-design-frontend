import { MyRoute } from "@/types"
import { useMemo } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { routes } from './index'
import { User } from "@/types"

export default function GuardRouter({ children }: any) { // 守卫路由

    const location = useLocation() // 获取当前路径
    const user: User = useMemo(() => {
        return JSON.parse(sessionStorage.getItem('user') as string)
    }, [])
    const token: string = useMemo(() => {
        return sessionStorage.getItem('token') || ''
    }, [])

    const routeMap: { [key: string]: any } = useMemo(() => {
        const ans: { [key: string]: any } = {};
        function core(routes: MyRoute[], prePath: string) {
            for(const route of routes) {
                ans[prePath + route.path] = route.meta || []
                if(route.children) {
                    core(route.children, prePath + route.path + '/')
                }
            }
        }
        core(routes, '')
        return ans
    }, [])
    
    if(!token) {
        console.log('没有token')
        return <Navigate to={'/'} replace />
    }
    if(!routeMap[location.pathname]?.includes(user.role === 0 ? 'admin' : 'user')) {
        console.log('没有权限')
        return <Navigate to={'/'} />
    }
    return <>{children}</>
}