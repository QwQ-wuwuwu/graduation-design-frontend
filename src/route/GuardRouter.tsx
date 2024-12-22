import { MyRoute } from "@/types"
import { useMemo } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { routes } from './index'

export default function GuardRouter({ children }: any) { // 守卫路由

    const token = sessionStorage.getItem('token') || ''
    const location = useLocation() // 获取当前路径
    const user = JSON.parse(sessionStorage.getItem('user') as string)

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
    
    if(!token) return <Navigate to={'/'} replace />
    if(!routeMap[location.pathname]?.includes(user.role === 0 ? 'admin' : 'user')) return <Navigate to={'/'} />
    return <>{children}</>
}