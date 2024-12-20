import React, { forwardRef } from "react";
// @ts-ignore
import Search from "./Search.svg?react";

const SearchIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <Search {...props} ref={ref} className={className || ""} />;
})

export default SearchIcon;