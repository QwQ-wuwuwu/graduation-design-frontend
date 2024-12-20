import React, { forwardRef } from "react";
// @ts-ignore
import Tab from "./Tab.svg?react";

const TabIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <Tab {...props} ref={ref} className={className || ""} />;
})

export default TabIcon;