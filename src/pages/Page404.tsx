import { Link } from 'react-router-dom'

export default function Page404() {
    return <div>
        <h1>你访问的页面飞往了月球!</h1>
        <Link to='/'>回到首页</Link>
    </div>
}