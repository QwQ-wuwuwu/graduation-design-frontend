import React, { forwardRef } from "react";
// @ts-ignore
import System from "./System.svg?react";

const SystemIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <System {...props} ref={ref} className={className || ""} />;
})

export default SystemIcon;