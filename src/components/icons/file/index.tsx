import React, { forwardRef } from "react";
// @ts-ignore
import File from './File.svg?react'

const FileIcon = forwardRef<
    SVGSVGElement & { className:any },
    React.PropsWithChildren<{ className:any}>
>(({ className, ...props }, ref) => {
    return <File {...props} ref={ref} className={className || ''} />
})

export default FileIcon;