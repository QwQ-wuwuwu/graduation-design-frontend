import React, { forwardRef } from "react";
// @ts-ignore
import Stop from "./Stop.svg?react";

const StopIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <Stop {...props} ref={ref} className={className || ""} />;
})

export default StopIcon;