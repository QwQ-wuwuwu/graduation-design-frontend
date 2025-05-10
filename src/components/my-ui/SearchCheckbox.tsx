import { Checkbox } from "@/components/ui/checkbox"
import SearchInput from "./SearchInput"
import { useEffect, useState } from "react"

export default function SearchCheckbox(
    { 
        data,
        onSelect
    }: { 
        data: any[],
        onSelect: (res: any[]) => void
    }
) {

    const [dataList, setDataList] = useState<any[]>([])
    
    useEffect(() => {
        setDataList(data)
    }, [data])

    const handleSelect = (val: boolean | string, item: any) => {
        console.log(val, item)
        const copyData = dataList.map((d: any) => ({
            ...d,
            checked: d.id === item.id ? val : d.checked
        }))
        setDataList(copyData)
        onSelect(copyData.filter((d: any) => d.checked).map((d: any) => d.id))
    }

    return (
        <div className="flex w-full h-full flex-col items-center space-y-2">
            <SearchInput className="w-[320px]" placeholder="搜索知识库" />
            <div className="flex flex-col w-full my-scrollbar h-[100px] border bg-white overflow-y-auto pt-2 items-start pl-2 space-y-2">
                {dataList.map((item) => (
                    <div className="flex items-center justify-center space-x-2" key={item.id}>
                        <Checkbox defaultChecked={item.checked}
                            onCheckedChange={(val) => handleSelect(val, item)} id={item.id + ''} />
                        <label
                            htmlFor={item.id + ''}
                            className="text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {item.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}