import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from '@/route/index.tsx'
import { Toaster } from './components/ui/toaster'
import { Suspense } from 'react'
import Loading from './pages/Loading'

function App() {

  return <div className=' w-full h-full'>
    {/* toast消息提示 */}
    <Toaster></Toaster> 
    <Suspense fallback={<Loading/>}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  </div>
}

export default App
