import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

const Login = lazy(() => import('@/pages/LoginPage/index'))
const Page404 = lazy(() => import('@/pages/Page404'))
const Layout = lazy(() => import('@/layout/index'))
const ChatPage = lazy(() => import('@/pages/ChatPage/index'))
const UserPage = lazy(() => import('@/pages/UserPage/index'))
const UserIfonPage = lazy(() => import('@/pages/UserPage/UserIfonPage'))
const ThemePage = lazy(() => import('@/pages/UserPage/ThemePage'))
const BuildPage = lazy(() => import('@/pages/BuildPage/index'))

const publicRouter = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '*', element: <Page404/> },
    { path: '/layout', element: <Layout />, children: [
        { index: true, element: <ChatPage /> },
        { path: 'chat', element: <ChatPage /> },
        { path: 'build', element: <BuildPage /> },
        { path: 'user', element: <UserPage />, children: [
            { index: true, element: <UserIfonPage /> },
            { path: 'info', element: <UserIfonPage /> },
            { path: 'theme', element: <ThemePage /> },
        ]}
    ]}
])

export default publicRouter