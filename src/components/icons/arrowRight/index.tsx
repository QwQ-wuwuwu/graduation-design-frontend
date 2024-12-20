import React, { forwardRef } from "react";
// @ts-ignore
import ArrowRight from "./ArrowRight.svg?react";

const ArrowRightIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <ArrowRight {...props} ref={ref} className={className || ""} />;
})

export default ArrowRightIcon;