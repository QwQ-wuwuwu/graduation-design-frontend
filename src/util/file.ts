
// 文件数组去重，判断lastModified字段是否相同
export function fileListRemoveDuplicates(fileList: File[] | any[]) {
    return fileList.filter((item, index, self) => self.findIndex(t => t.lastModified === item.lastModified) === index)
}