import { Terminal } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useMessage } from "@/hooks/useMessage"
import ReactDOM from "react-dom"
import { useEffect, useState } from "react"

export default function Message() {

    const { open, message, closeAlert } = useMessage()
    const [id, setId] = useState<any | null>(null)

    if(open) {
        const timeId = setTimeout(() => {
            closeAlert()
            setId(timeId)
        }, 2000);
    }

    useEffect(() => {
        return () => {
            clearTimeout(id)
            setId(null)
        }
    },[])

    if(!open) return null

    return ReactDOM.createPortal(
        <Alert variant={'destructive'} className="absolute top-0 right-0 m-4 bg-white w-[400px]">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </Alert>,
        document.querySelector('#root') as HTMLElement
    )
}