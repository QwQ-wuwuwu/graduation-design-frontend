import React, { forwardRef  } from 'react';
// @ts-ignore
import Application from './Application.svg?react'

const ApplicationIcon = forwardRef<
    SVGSVGElement & { className: any },
    React.PropsWithChildren<{ className?: string }>
> (({className, ...props}, ref) => {
    return <Application {...props} ref={ref} className={className || ''} />
})

export default ApplicationIcon