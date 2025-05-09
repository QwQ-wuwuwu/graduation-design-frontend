import { Button } from "@/components/ui/button"

export default function EvaluationPage() {
    return <div className="w-full h-full p-2">
        <div className="w-full h-12 flex justify-end space-x-4 items-center">
            <Button className="w-[150px]">创建评测</Button>
        </div>
        <div className="w-full h-[calc(100%-48px-64px)] overflow-y-auto my-scrollbar"></div>
        <div className="w-full h-16 flex items-center">
            <p className="text-sm text-gray-500">评测集合. </p>
        </div>
    </div>
}