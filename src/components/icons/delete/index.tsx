import React, { forwardRef } from "react";
// @ts-ignore
import Delete from "./Delete.svg?react";

const DeleteIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <Delete {...props} ref={ref} className={className || ""} />;
})

export default DeleteIcon;