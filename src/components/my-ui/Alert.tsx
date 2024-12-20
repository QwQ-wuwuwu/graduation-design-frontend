import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"
import WarnningIcon from "../icons/warnning"
import { useState } from "react"

export default function Alert(
    { 
        children,
        title,
        desc,
        onConfirm 
    }: 
    { 
        children: React.ReactNode,
        title: string,
        desc?: string,
        onConfirm: () => void
    }) {

    const [open, setOpen] = useState(false)

    return <AlertDialog open={open} onOpenChange={(open) => setOpen(open)}>
    <AlertDialogTrigger asChild>
      {children}
    </AlertDialogTrigger>
    <AlertDialogContent className="max-w-[400px]">
      <AlertDialogHeader>
        <AlertDialogTitle><WarnningIcon />{title}</AlertDialogTitle>
        <AlertDialogDescription className="text-gray-700">
          {desc}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className=" flex justify-center items-center mt-6">
        <Button variant={'outline'} className="w-[100px]" onClick={() => setOpen(false)}>取消</Button>
        <Button variant={'destructive'} className="w-[100px]" onClick={onConfirm}>确认</Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
}