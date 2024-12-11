import React, { forwardRef } from "react";
// @ts-ignore
import Web from "./Web.svg?react";

const WebIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <Web {...props} ref={ref} className={className || ""} />;
})

export default WebIcon;