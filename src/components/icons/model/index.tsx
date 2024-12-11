import React, { forwardRef } from "react";
// @ts-ignore
import Model from "./Model.svg?react";

const ModelIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <Model {...props} ref={ref} className={className || ""} />;
})

export default ModelIcon;