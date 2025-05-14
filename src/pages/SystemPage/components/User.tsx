import { Button } from "@/components/ui/button"
import SearchInput from "@/components/my-ui/SearchInput"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Loading from "@/pages/Loading"

const userList = [
    { id: 1, name: '张三'},
    { id: 2, name: '李四'},
    { id: 3, name: '王五'},
    { id: 4, name: '赵六'},
    { id: 5, name: '田七'},
    { id: 6, name: '周八'},
    { id: 7, name: '吴九'},
    { id: 8, name: '郑十'},
    { id: 9, name: '钱十一'},
    { id: 10, name: '孙十二'},          
    { id: 11, name: '李十三'},
    { id: 12, name: '王十四'},
    { id: 13, name: '赵十五'},
    { id: 14, name: '田十六'},
    { id: 15, name: '周十七'},
    { id: 16, name: '吴十八'},
    { id: 17, name: '郑十九'},
    { id: 18, name: '钱二十'},
    { id: 19, name: '孙二十一'},          
    { id: 20, name: '李二十二'},
    { id: 21, name: '王二十三'},
]

export default function User() {
    return <div className="w-full h-full p-2">
        <div className="w-full h-12 flex justify-end space-x-4 items-center">
            <SearchInput placeholder="搜索用户" />
            <Button>创建用户</Button>
        </div>
        <div className="w-full h-[calc(100%-48px-64px)] overflow-y-auto my-scrollbar">
            {userList.length ? <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead className="max-w-[300px]">用户名称</TableHead>
                        <TableHead>角色</TableHead>
                        <TableHead>创建时间</TableHead>
                        <TableHead>行为</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userList.map((user:any, index) => <TableRow key={user.id}>
                        <TableCell>{index}</TableCell>
                        <TableCell className="max-w-[300px]">
                            <div className=" whitespace-pre-wrap break-all text-truncate-3">{user.name}</div>
                        </TableCell>
                        <TableCell>普通用户</TableCell>
                        <TableCell>2025-02-28</TableCell>
                        <TableCell>创建助手</TableCell>
                        <TableCell className="text-right space-x-4">
                            <Button variant={'link'} className="text-blue-600 px-0">设置</Button>
                            <Button variant={'link'} className="text-red-500 px-0">删除</Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table> : <Loading />}
        </div>
        <div className="w-full h-16 flex items-center">
            <p className="text-sm text-gray-500">用户列表. </p>
        </div>
    </div>
}