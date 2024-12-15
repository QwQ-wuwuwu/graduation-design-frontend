import React, { forwardRef } from "react";
// @ts-ignore
import Preset from "./Preset.svg?react";

const PresetIcon = forwardRef<
  SVGSVGElement & { className: any },
  React.PropsWithChildren<{ className?: string }>
>(({ className, ...props }, ref) => {
    return <Preset {...props} ref={ref} className={className || ""} />;
})

export default PresetIcon;