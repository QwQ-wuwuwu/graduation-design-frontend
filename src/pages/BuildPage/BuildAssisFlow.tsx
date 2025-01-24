import '@xyflow/react/dist/style.css';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant,
  } from '@xyflow/react';
import RobotIcon from "@/components/icons/robot"
import { EditIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import useAssisOnlineStore from '@/hooks/assistantOnline';
import { getRandomColor } from '@/util/randomColor';
import { useCallback } from 'react';
import AssistantNode from './component/AssistantNode';
import PortraitNode from './component/PortraitNode';
import ModelConfigNode from './component/ModelConfigNode';
import KnowledgeNode from './component/KnowledgeNode';
import GuidNode from './component/GuidNode';
import ModelNode from './component/ModelNode';

const nodeTypes = { 
    assistantNode: AssistantNode,
    portraitNode: PortraitNode,
    modelConfigNode: ModelConfigNode,
    knowledgeNode: KnowledgeNode,
    guidNode: GuidNode,
    modelNode: ModelNode 
}

const initialNodes = [
    { id: '1', type: 'modelNode', position: { x: -100, y: 350 }, data: { label: '1' } },
    { id: '2', type: 'portraitNode', position: { x: 306, y: 50 }, data: { label: '2' } },
    { id: '3', type: 'modelConfigNode', position: { x: 300, y: 500 }, data: { label: '3' } },
    { id: '4', type: 'knowledgeNode', position: { x: 800, y: 500 }, data: { label: '4' } },
    { id: '5', type: 'guidNode', position: { x: 800, y: 650 }, data: { label: '5' } },
    { id: '6', type: 'assistantNode', position: { x: 1300, y: 400 }, data: { label: '6' } },
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#024DE3', strokeWidth: 1 } },
    { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#024DE3', strokeWidth: 1 } },
    { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#024DE3', strokeWidth: 1 } },
    { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#024DE3', strokeWidth: 1 } },
    { id: 'e2-6', source: '2', target: '6', animated: true, style: { stroke: '#024DE3', strokeWidth: 1 } },
    { id: 'e4-6', source: '4', target: '6', animated: true, style: { stroke: '#024DE3', strokeWidth: 1 } },
    { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#024DE3', strokeWidth: 1 } },
];

export default function BuildAssisFlow() {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const navigate = useNavigate()
    const setOnline = useAssisOnlineStore((state:any) => state.setOnline)

    const handleOnline = () => {
        setNodes([])
        navigate('/layout/chat')
        setOnline(0) // 测试用
    }

    const onConnect = useCallback(
        (params:any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return <div className='w-full h-full'>
        <div className="w-full h-[65px] flex justify-between items-center border-b">
            <div className="flex space-x-4 pl-4 items-center">
                <div className="flex items-center">
                    <div id="a1" className={`w-7 h-7 rounded-lg mr-3 flex justify-center items-center`} style={{ backgroundColor: getRandomColor() }}>
                        <RobotIcon className="w-6 h-6 text-[white]" />
                    </div>
                    <span className="text-xl">助手名称</span>
                </div>
                <EditIcon className="w-5 h-5 cursor-pointer" />
            </div>
            <div className="flex space-x-4 pr-4 ">
                <Button variant={'outline'} className="w-[100px]">保存配置</Button>
                <Button onClick={handleOnline} className="w-[100px]">上线使用</Button>
            </div>
        </div>
        <div className="w-full h-[calc(100%-65px)] flex">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                connectionLineStyle={{ stroke: '#024DE3', strokeWidth: 2 }}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView>
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    </div>
}