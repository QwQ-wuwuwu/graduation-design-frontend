import React, { forwardRef } from "react";
// @ts-ignore
import Warnning from "./Warnning.svg?react";

const WarnningIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <Warnning {...props} ref={ref} className={className || ""} />;
})

export default WarnningIcon;