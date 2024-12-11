import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Loading() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Button disabled variant={'ghost'}>
        <Loader2 className=" animate-spin" />
        Loading...
      </Button>
    </div>
  )
}