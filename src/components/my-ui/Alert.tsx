import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import WarnningIcon from "../icons/warnning"
import { Button } from "../ui/button"

export default function Alert(
    { 
        open,
        title,
        desc,
        onConfirm,
        onCancel 
    }: 
    { 
        open: boolean,
        title: string,
        desc: string,
        onConfirm: () => void
        onCancel: () => void
    }) {

    return <AlertDialog open={open} onOpenChange={() => onCancel()}>
    <AlertDialogContent className="max-w-[400px]">
      <AlertDialogHeader>
        <AlertDialogTitle><WarnningIcon />{title}</AlertDialogTitle>
        <AlertDialogDescription className="text-gray-700">
          {desc}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className=" flex justify-center items-center mt-6">
        <Button variant={'outline'} className="w-[100px]" onClick={onCancel}>取消</Button>
        <Button variant={'destructive'} className="w-[100px]" onClick={onConfirm}>确认</Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
}