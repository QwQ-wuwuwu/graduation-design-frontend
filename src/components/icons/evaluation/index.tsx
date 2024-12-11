import React, { forwardRef } from "react";
// @ts-ignore
import Evaluation from './Evaluation.svg?react'

const EvaluationIcon = forwardRef<
    SVGSVGElement & { className:any },
    React.PropsWithChildren<{ className:any}>
>(({ className, ...props }, ref) => {
    return <Evaluation {...props} ref={ref} className={className || ''} />
})

export default EvaluationIcon;