import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer";
import { uploadAllFiles } from "@/request/API/knowledge";
import { fileListRemoveDuplicates } from "@/util/file";
import { UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import CloseIcon from "../icons/close";
import FileIcon from "../icons/file";
import { Progress } from "../ui/progress";
import { uploadFiles } from "@/request/model_api/knowledge";
import { useKnowDetailStore } from "@/store/knowledge";

type Props = {
    open: boolean,
    onUpload: () => void,
    onClose: () => void
}

export default function DropFile({
    open,
    onUpload,
    onClose,
}: Props) {

    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone();
    const [fileList, setFileList] = useState<File[] | any[]>([])
    const [progresses, setProgresses] = useState<number[]>([])

    useEffect(() => {
        // console.log('acceptedFiles-->', acceptedFiles)
        if(progresses.length > 0) {
            setProgresses([])
            setFileList([])
        }
        setFileList(pre => fileListRemoveDuplicates([...pre, ...acceptedFiles]))
    }, [acceptedFiles])

    const knowledge: any = useKnowDetailStore((state:any) => state.knowledge)
    const handleUpload = async () => {
        console.log('newFiles-->', fileList)
        uploadFiles(knowledge.knowledge_id, fileList);
        uploadAllFiles(fileList, (progresses: number[]) => {
            console.log('progresses-->', progresses)
            setProgresses([...progresses])
        }).then(() => onUpload())
    }

    const handleDelete = (id: string) => {
        const newFiles = fileList.filter(file => file.lastModified !== parseInt(id))
        setFileList(newFiles)
    }

    const handleCancel = () => {
        setFileList([])
        onClose()
    }

    return <div className='w-full m-2'>
        <Drawer open={open} onOpenChange={() => {onClose(); setFileList([])}} >
            <DrawerContent>
                <div className="flex justify-center items-center space-x-12">
                    <div className="w-[400px] h-[450px] round">
                        <DrawerHeader>
                            <DrawerTitle className="text-center">上传文件</DrawerTitle>
                        </DrawerHeader>
                        <div className="text-gray-600">
                            <div { ...getRootProps({ 
                                className: 'dropzone h-[280px] border-2 rounded-lg border-dashed' 
                                }) }>
                                <input { ...getInputProps() } />
                                <div className=" h-full flex flex-col justify-center items-center space-y-4">
                                    <UploadIcon />
                                    { isDragActive? 
                                    <p>将文件拖拽到这里...</p> :
                                    <p>点击或拖拽文件到此处上传</p> }
                                </div>
                            </div>
                        </div>
                        {/* <input type="file" onChange={handleChange} /> */}
                        <DrawerFooter className="">
                            <Button variant={'outline'} onClick={handleCancel}>取消</Button>
                            <Button disabled={fileList.length === 0} onClick={handleUpload} >确认上传</Button>
                        </DrawerFooter>
                    </div>
                    {fileList.length > 0 && <div className="w-[600px] h-[450px] pt-4 overflow-y-auto scrollbar-hide ">
                        {progresses.length > 0 ? <div>
                            {fileList.map((file, index) => <div key={file.lastModified} className="mb-2">
                                <div className="flex items-start space-x-2">
                                    <FileIcon className={'text-blue-600'} />
                                    <p className="text-gray-500 text-md font-medium">{file.name}</p>
                                </div>
                                <Progress value={progresses[index]} className="" />
                            </div>)}
                        </div> : <div>
                            {fileList.map((file) => <div key={file.lastModified} className="flex justify-between items-start mb-2">
                                <div className="flex items-start space-x-2">
                                    <FileIcon className={'text-blue-600'} />
                                    <p className="text-gray-500 text-md font-medium">{file.name}</p>
                                </div>
                                {/* @ts-ignore */}
                                <CloseIcon onClick={() => handleDelete(file.lastModified)} className="w-4 mt-1 h-4 cursor-pointer" />
                            </div>)}
                        </div>}
                    </div>}
                </div>
            </DrawerContent>
        </Drawer>
    </div>
}