import React, { forwardRef } from "react";
// @ts-ignore
import Robot from "./Robot.svg?react";

const RobotIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <Robot {...props} ref={ref} className={className || ""} />;
})

export default RobotIcon;