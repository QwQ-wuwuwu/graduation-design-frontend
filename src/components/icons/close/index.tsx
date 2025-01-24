import React, { forwardRef } from "react";
// @ts-ignore
import Close from "./Close.svg?react";

const CloseIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <Close {...props} ref={ref} className={className || ""} />;
})

export default CloseIcon;