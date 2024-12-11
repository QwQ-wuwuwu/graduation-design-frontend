import React, { forwardRef } from "react";
// @ts-ignore
import ArrowUp from "./ArrowUp.svg?react";

const ArrowUpIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <ArrowUp {...props} ref={ref} className={className || ""} />;
})

export default ArrowUpIcon;