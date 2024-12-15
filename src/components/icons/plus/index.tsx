import React, { forwardRef } from "react";
// @ts-ignore
import Plus from "./Plus.svg?react";

const PlusIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <Plus {...props} ref={ref} className={className || ""} />;
})

export default PlusIcon;