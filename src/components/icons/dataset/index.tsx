import React, { forwardRef } from "react";
// @ts-ignore
import Dataset from "./Dataset.svg?react";

const DatasetIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <Dataset {...props} ref={ref} className={className || ""} />;
})

export default DatasetIcon;