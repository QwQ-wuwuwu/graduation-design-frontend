import React, { forwardRef } from "react";
// @ts-ignore
import Setting from "./Setting.svg?react";

const SettingIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <Setting {...props} ref={ref} className={className || ""} />;
})

export default SettingIcon;