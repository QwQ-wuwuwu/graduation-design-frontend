import { Select, SelectTrigger, SelectGroup, SelectItem, SelectContent, SelectValue } from "@/components/ui/select"
import SearchInput from "./SearchInput"
import { ChangeEvent } from "react"

export default function SearchSelect({
    list,
    selectValue,
    inputPlaceholder,
    defaultValue,
    onOpen,
    onSearch,
    onSelect,
}: {
    list: any[],
    selectValue: string,
    inputPlaceholder?: string,
    defaultValue?: string,
    onOpen?: () => void,
    onSearch?: (e: ChangeEvent<HTMLInputElement>) => void
    onSelect: (value: string) => void
}) {
    return <div>
        <Select defaultValue={defaultValue} onOpenChange={() => onOpen && onOpen()} onValueChange={onSelect}>
            <SelectTrigger>
                <SelectValue placeholder={selectValue} />
            </SelectTrigger>
            <SelectContent>
                <SearchInput onChange={onSearch} className="mb-4" placeholder={inputPlaceholder} />
                <SelectGroup>
                    {list.map((item) => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
}