import React, { forwardRef } from "react";
// @ts-ignore
import Technology from "./Technology.svg?react";

const TechnologyIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <Technology {...props} ref={ref} className={className || ""} />;
})

export default TechnologyIcon;