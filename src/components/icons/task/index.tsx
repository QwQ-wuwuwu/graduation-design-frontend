import React, { forwardRef } from "react";
// @ts-ignore
import Task from "./Task.svg?react";

const TaskIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <Task {...props} ref={ref} className={className || ""} />;
})

export default TaskIcon;