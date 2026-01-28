import { forwardRef } from 'react'
import { DropdownMenu } from 'radix-ui'
import cn from 'clsx'

import styles from '../styles/index.module.scss'

export const DropdownItem = forwardRef<
  HTMLDivElement,
  DropdownMenu.DropdownMenuLabelProps
>(({ className, children, ...props }, ref) => {
  return (
    <DropdownMenu.Label
      className={cn(styles.item, className)}
      ref={ref}
      {...props}
    >
      {children}
    </DropdownMenu.Label>
  )
})
