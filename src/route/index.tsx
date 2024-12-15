import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import GuardRouter from './GuardRouter'
import { MyRoute } from '@/types'

const Login = lazy(() => import('@/pages/LoginPage/index'))
const Page404 = lazy(() => import('@/pages/Page404'))
const Layout = lazy(() => import('@/layout/index'))
const ChatPage = lazy(() => import('@/pages/ChatPage/index'))
const UserPage = lazy(() => import('@/pages/UserPage/index'))
const UserIfonPage = lazy(() => import('@/pages/UserPage/UserIfonPage'))
const ThemePage = lazy(() => import('@/pages/UserPage/ThemePage'))
const BuildPage = lazy(() => import('@/pages/BuildPage/index'))

export const routes:MyRoute[] = [
    { path: '/', element: <Login /> },
    { path: '*', element: <Page404/> },
    { path: '/layout', element: <GuardRouter><Layout /></GuardRouter>, meta: ['admin', 'user'], children: [
        { path: '', element: <ChatPage />, meta: ['admin', 'user'] },
        { path: 'chat', element: <ChatPage />, meta: ['admin', 'user'] },
        { path: 'build', element: <BuildPage />, meta: ['admin', 'user'] },
        { path: 'user', element: <UserPage />, meta: ['admin', 'user'],
            children: [
            { path: '', element: <UserIfonPage />, meta: ['admin', 'user'] },
            { path: 'info', element: <UserIfonPage />, meta: ['admin', 'user'] },
            { path: 'theme', element: <ThemePage />, meta: ['admin', 'user'] },
        ]},
        { path: 'system', element: <ChatPage />, meta: ['admin'] }
    ]}
]

export const router = createBrowserRouter(routes)
