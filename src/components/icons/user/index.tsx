import React, { forwardRef } from "react";
// @ts-ignore
import User from "./User.svg?react";

const UserIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <User {...props} ref={ref} className={className || ""} />;
})

export default UserIcon;