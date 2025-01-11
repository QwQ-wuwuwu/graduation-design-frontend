import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/route/index.tsx'
import { Toaster } from './components/ui/toaster'
import { Suspense } from 'react'
import Loading from './pages/Loading'
import { UserContext } from './contexts/UserContext'
import { AlertProvider } from './contexts/AlertContext'
import Message from './components/my-ui/Message'

function App() {

  const user = JSON.parse(sessionStorage.getItem('user') as string)

  return <div className=' w-full h-full'>
    {/* toast消息提示 */}
    <Toaster></Toaster> 
    {/* alert全局提示 */}
    <AlertProvider>
      <Suspense fallback={<Loading/>}>
        <UserContext.Provider value={user}>
          <RouterProvider router={router}></RouterProvider>
        </UserContext.Provider>
      </Suspense>
      {/* message全局提示 */}
      <Message></Message>
    </AlertProvider>
  </div>
}

export default App
