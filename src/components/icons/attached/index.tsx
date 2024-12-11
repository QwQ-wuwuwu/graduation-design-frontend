import React, { forwardRef } from "react";
// @ts-ignore
import Attached from "./Attached.svg?react";

const AttachedIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <Attached {...props} ref={ref} className={className || ""} />;
})

export default AttachedIcon;