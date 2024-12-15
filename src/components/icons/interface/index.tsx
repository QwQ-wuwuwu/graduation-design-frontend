import React, { forwardRef } from "react";
// @ts-ignore
import Interface from './Interface.svg?react'

const InterfaceIcon = forwardRef<
    SVGSVGElement & { className:any },
    React.PropsWithChildren<{ className:any}>
>(({ className, ...props }, ref) => {
    return <Interface {...props} ref={ref} className={className || ''} />
})

export default InterfaceIcon;