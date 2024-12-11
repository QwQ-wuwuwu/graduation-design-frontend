import React, { forwardRef } from "react";
// @ts-ignore
import ArrowDown from "./ArrowDown.svg?react";

const ArrowDownIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <ArrowDown {...props} ref={ref} className={className || ""} />;
})

export default ArrowDownIcon;