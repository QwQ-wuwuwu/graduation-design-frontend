import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import SearchInput from "@/components/my-ui/SearchInput"
import { Button } from "@/components/ui/button"

export default function DatasetPage() {

    const [data, setData] = useState([
        { type: 'model', content: '自动调整高度：最常用的方式是使用 JavaScript（纯 JavaScript 或 React），通过 textarea.scrollHeight 动态设置高度。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'user', content: 'resize 和 overflow 控制，适合控制 textarea 的大小和溢出。' },
        { type: 'model', content: '在现代浏览器中，textarea 的高度可以通过 min-height 和 max-height 来控制，虽然它不会完全随着内容高度变化，但能在一定范围内保持弹性。' },        
    ])

    return <div className="w-full h-full overflow-y-auto my-scrollbar p-2">
        <div className=" fixed right-4 z-10 h-12 flex items-center space-x-4 justify-end">
            <SearchInput placeholder="数据集名称" />
            <Button onClick={() => setData([])} className="w-[150px]">创建数据集</Button>
        </div>
        <Table className="mt-8 mb-[80px]">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">数据集名称</TableHead>
                    <TableHead>来源</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((invoice, index) => (
                <TableRow key={index}>
                    <TableCell className="font-medium">{invoice.type}</TableCell>
                    <TableCell>{invoice.content}</TableCell>
                    <TableCell>2025-05-10</TableCell>
                    <TableCell className="text-right space-x-4">
                        <Button variant={'link'} className="text-blue-600 px-0">设置</Button>
                        <Button variant={'link'} className="text-red-500 px-0">删除</Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
        <div className=" fixed bottom-0 z-10 bg-white w-full h-16 flex items-center">
            <p className="text-sm text-gray-500">数据集集合. </p>
        </div>
    </div>
}