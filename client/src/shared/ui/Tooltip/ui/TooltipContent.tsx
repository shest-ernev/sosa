import { forwardRef } from 'react'
import { Tooltip } from 'radix-ui'
import cn from 'clsx'

import styles from '../styles/index.module.scss'

export const TooltipContent = forwardRef<
  HTMLDivElement,
  Tooltip.TooltipContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <Tooltip.Portal>
      <Tooltip.Content
        className={cn(styles.content, className)}
        ref={ref}
        {...props}
      >
        {children}
      </Tooltip.Content>
    </Tooltip.Portal>
  )
})
