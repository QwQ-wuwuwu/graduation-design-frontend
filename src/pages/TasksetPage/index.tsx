import SearchInput from "@/components/my-ui/SearchInput"
import { Button } from "@/components/ui/button"

export default function TasksetPage() {
    return <div className="w-full h-full overflow-y-auto my-scrollbar p-2">
        <div className=" fixed right-4 z-10 h-12 flex items-center space-x-4 justify-end">
            <SearchInput placeholder="任务名称" />
            <Button className="w-[150px]">创建任务</Button>
        </div>
        <div className=" fixed bottom-0 z-10 bg-white w-full h-16 flex items-center">
            <p className="text-sm text-gray-500">任务集合. </p>
        </div>
    </div>
}