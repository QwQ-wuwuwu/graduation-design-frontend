/* eslint-disable react-refresh/only-export-components */
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
const BuildAssistant = lazy(() => import('@/pages/BuildPage/BuildAssisFlow'))
const KnowledgePage = lazy(() => import('@/pages/KnowledgePage/index'))
const DatasetPage = lazy(() => import('@/pages/DatasetPage'))
const TasksetPage = lazy(() => import('@/pages/TasksetPage'))
const DocKnowledge = lazy(() => import("@/pages/KnowledgePage/DocKnowledge"))
const QAKnowledge = lazy(() => import("@/pages/KnowledgePage/QAKnowledge"))
const ApiPage = lazy(() => import('@/pages/ApiPage'))
const ModelPage = lazy(() => import('@/pages/ModelPage'))
const Mangagement = lazy(() => import('@/pages/ModelPage/Management'))
const Finetune = lazy(() => import('@/pages/ModelPage/Finetune'))
const DocKnowDetail = lazy(() => import('@/pages/KnowledgePage/component/DocKnowDetail'))
const QAKnowDetail = lazy(() => import('@/pages/KnowledgePage/component/QAKnowDetail'))
const SystemPage = lazy(() => import('@/pages/SystemPage'))
const SystemUser = lazy(() => import('@/pages/SystemPage/components/User'))
const SystemModel = lazy(() => import('@/pages/SystemPage/components/Model'))
const SystemAssistant = lazy(() => import('@/pages/SystemPage/components/Assistant'))
const EvaluationPage = lazy(() => import('@/pages/EvaluationPage'))

export const routes: MyRoute[] = [
    { path: '/', element: <Login /> },
    { path: '/layout', element: <GuardRouter><Layout /></GuardRouter>, meta: ['admin', 'user'], children: [
        { path: '', element: <ChatPage />, meta: ['admin', 'user'] },
        { path: 'chat', element: <ChatPage />, meta: ['admin', 'user'] },
        { path: 'build', element: <BuildPage />, meta: ['admin', 'user'] },
        { path: 'model', element: <ModelPage />, meta: ['admin', 'user'], children: [
            { path: '', element: <Mangagement />, meta: ['admin', 'user'] },
            { path: 'management', element: <Mangagement />, meta: ['admin', 'user'] },
            { path: 'finetune', element: <Finetune />, meta: ['admin', 'user'] },
        ] },
        { path: 'knowledge', element: <KnowledgePage />, meta: ['admin', 'user'], children: [
            { path: '', element: <DocKnowledge />, meta: ['admin', 'user'] },
            { path: 'doc', element: <DocKnowledge />, meta: ['admin', 'user'] },
            { path: 'qa', element: <QAKnowledge />, meta: ['admin', 'user'] },
            { path: 'doclib', element: <DocKnowDetail />, meta: ['admin', 'user'] },
            { path: 'qalib', element: <QAKnowDetail />, meta: ['admin', 'user'] },
        ] },
        { path: 'preset', element: <BuildPage />, meta: ['admin'] },
        { path: 'dataset', element: <DatasetPage />, meta: ['admin'] },
        { path: 'taskset', element: <TasksetPage />, meta: ['admin'] },
        { path: 'evaluation', element: <EvaluationPage />, meta: ['admin', 'user'] },
        { path: 'user', element: <UserPage />, meta: ['admin', 'user'],
            children: [
            { path: '', element: <UserIfonPage />, meta: ['admin', 'user'] },
            { path: 'info', element: <UserIfonPage />, meta: ['admin', 'user'] },
            { path: 'theme', element: <ThemePage />, meta: ['admin', 'user'] },
        ]},
        { path: 'api', element: <ApiPage />, meta: ['admin'] },
        { path: 'system', element: <SystemPage />, meta: ['admin'], 
            children: [
                { path: '', element: <SystemModel />, meta: ['admin'] },
                { path: 'model', element: <SystemModel />, meta: ['admin'] },
                { path: 'user', element: <SystemUser />, meta: ['admin'] },
                { path: 'assistant', element: <SystemAssistant />, meta: ['admin'] },
            ]
        },
        { path: 'assistant', element: <BuildAssistant />, meta: ['admin', 'user'] },
    ]},
    { path: '*', element: <Page404/> },
]

export const router = createBrowserRouter(routes)
