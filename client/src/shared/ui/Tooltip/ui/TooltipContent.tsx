import { Tooltip } from 'radix-ui'
import cn from 'clsx'

import { TooltipContentProps } from '../types'
import styles from '../styles/index.module.scss'

export const TooltipContent = ({
  className,
  children,
  ...props
}: TooltipContentProps) => {
  return (
    <Tooltip.Portal>
      <Tooltip.Content
        className={cn(styles.content, className)}
        {...props}
      >
        {children}
      </Tooltip.Content>
    </Tooltip.Portal>
  )
}
