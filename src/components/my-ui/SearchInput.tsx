import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import SearchIcon from "../icons/search"
import { forwardRef, memo } from "react"

const SearchInput = forwardRef(
    ({   className, 
        placeholder,
        onChange,
        onKeyDown,
        onInput,
        value
    }: 
    {   className?: string,
        placeholder?: string,
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
        onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
        onInput?: (e: React.FormEvent<HTMLInputElement>) => void,
        value?: any
    }, ref: React.Ref<HTMLInputElement>) => {
    return <div className="relative">
        <SearchIcon className="w-5 h-5 absolute top-2 left-2" />
        <Input ref={ref} onInput={onInput} onKeyDown={onKeyDown} onChange={onChange} value={value} 
        placeholder={placeholder} className={cn(className, 'pl-8 bg-white')}></Input>
    </div>
})

SearchInput.displayName = "SearchInput"

export default memo(SearchInput);