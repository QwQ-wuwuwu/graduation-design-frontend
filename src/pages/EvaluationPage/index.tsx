import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Loading from "@/pages/Loading"

const list = [
    { id: 1, name: '张三年', status: '等待中', method: '自动评测', createTime: '2023-10-01 12:00:00', model: 'GPT-3.5' },
    { id: 2, name: '小明', status: '等待中', method: '自动评测', createTime: '2023-10-01 12:00:00', model: 'GPT-3.5' },
    { id: 3, name: 'djksaldjklas', status: '等待中', method: '自动评测', createTime: '2023-10-01 12:00:00', model: 'GPT-3.5' },
    { id: 4, name: '张三年', status: '等待中', method: '自动评测', createTime: '2023-10-01 12:00:00', model: 'GPT-3.5' },
    { id: 5, name: '张三年', status: '等待中', method: '自动评测', createTime: '2023-10-01 12:00:00', model: 'GPT-3.5' },
    { id: 6, name: '张三年', status: '等待中', method: '自动评测', createTime: '2023-10-01 12:00:00', model: 'GPT-3.5' },
    { id: 7, name: '张三年', status: '等待中', method: '自动评测', createTime: '2023-10-01 12:00:00', model: 'GPT-3.5' },
]

export default function EvaluationPage() {
    return <div className="w-full h-full p-2">
        <div className="w-full h-12 flex justify-between space-x-4 items-center">
            <p className="text-sm text-gray-700">通过构建好的评测数据集对AI助手进行测试，以检验助手性能，并可进行对比分析。</p>
            <Button className="w-[150px]">创建评测任务</Button>
        </div>
        <div className="w-full h-[100px] flex justify-start items-center">
            <Card>
                <CardContent className="w-[520px] pt-2 bg-blue-200 rounded-lg">
                    <div className="flex justify-between">
                        <p className="text-xl">创建评测任务</p>
                        <p className="text-2xl text-red-500">step1</p>
                    </div>
                    <p className="text-sm text-gray-500">上传本地数据或选择平台预置数据集，选择需要评测的模型，进行自动评测</p>
                </CardContent>
            </Card>
            <div className=" rounded-full w-10 h-10 border flex justify-center items-center mx-2">
                <ArrowRight className="w-6 h-6" />
            </div>
            <Card>
                <CardContent className="w-[520px] pt-2 bg-blue-200 rounded-lg">
                    <div className="flex justify-between">
                        <p className="text-xl">配置打分模型</p>
                        <p className="text-2xl text-red-500">step2</p>
                    </div>
                    <p className="text-sm text-gray-500">选择自动打分的模型，设置不同的评估维度</p>
                </CardContent>
            </Card>
            <div className=" rounded-full w-10 h-10 border flex justify-center items-center mx-2">
                <ArrowRight className="w-6 h-6" />
            </div>
            <Card>
                <CardContent className="w-[520px] pt-2 bg-blue-200 rounded-lg">
                    <div className="flex justify-between">
                        <p className="text-xl">查看评测报告</p>
                        <p className="text-2xl text-red-500">step3</p>
                    </div>
                    <p className="text-sm text-gray-500">生成多个维度的评测报告，查看详细评分、能力指标、评估日志等数据结果</p>
                </CardContent>
            </Card>
        </div>
        <div className="w-full h-[calc(100%-48px-64px-100px)] pt-6 overflow-y-auto my-scrollbar">
            {list.length ? <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="max-w-[300px]">任务名称</TableHead>
                        <TableHead>任务状态</TableHead>
                        <TableHead>评测方式</TableHead>
                        <TableHead>评测模型</TableHead>
                        <TableHead>创建时间</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {list.map((data:any, index) => <TableRow key={data.id}>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.status}</TableCell>
                        <TableCell>{data.method}</TableCell>
                        <TableCell>{data.model}</TableCell>
                        <TableCell>{data.createTime}</TableCell>
                        <TableCell className="text-right space-x-4">
                            <Button variant={'link'} className="text-blue-600 px-0">停止测评</Button>
                            <Button variant={'link'} className="text-red-500 px-0">删除</Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table> : <Loading />}
        </div>
        <div className="w-full h-16 flex items-center">
            <p className="text-sm text-gray-500">评测集合. </p>
        </div>
    </div>
}