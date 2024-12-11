import React, { forwardRef } from "react";
// @ts-ignore
import Knowledge from './Knowledge.svg?react'

const KnowledgeIcon = forwardRef<
    SVGSVGElement & { className:any },
    React.PropsWithChildren<{ className:any}>
>(({ className, ...props }, ref) => {
    return <Knowledge {...props} ref={ref} className={className || ''} />
})

export default KnowledgeIcon;

