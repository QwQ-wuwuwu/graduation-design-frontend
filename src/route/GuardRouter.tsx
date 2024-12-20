import { Navigate, useLocation } from "react-router-dom"
import { routes } from './index'
import { MyRoute } from "@/types"

export default function GuardRouter({ children }: any) { // 守卫路由

    const token = sessionStorage.getItem('token') || ''
    const location = useLocation() // 获取当前路径
    const user = JSON.parse(sessionStorage.getItem('user') as string)
    const routeMap: { [key: string]: any } = {};

    const generateRouteMap = (routes: MyRoute[], prePath: string) => {
        for(const route of routes) {
            routeMap[prePath + route.path] = route.meta || []
            if(route.children) {
                generateRouteMap(route.children, prePath + route.path + '/')
            }
        }
    }
    generateRouteMap(routes, '')
    
    if(!token) return <Navigate to={'/'} replace />
    if(!routeMap[location.pathname]?.includes(user.role === 0 ? 'admin' : 'user')) return <Navigate to={'*'} />
    return <>{children}</>
}