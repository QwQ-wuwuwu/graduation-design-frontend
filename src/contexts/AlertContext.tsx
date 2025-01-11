/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

const alert = { // 作默认值
    open: false,
    message: '',
    openAlert: (msg: string) => {
        alert.open = true
        alert.message = msg
    },
    closeAlert: () => {
        alert.open = false
    }
}
export const AlertContext = createContext(alert)

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')

    const openAlert = (msg: string) => {
        setOpen(true)
        setMessage(msg)
    }

    const closeAlert = () => {
        setOpen(false)
        setMessage('')
    }

    return <AlertContext.Provider value={{ open, message, openAlert, closeAlert }}>
        {children}
    </AlertContext.Provider>
}