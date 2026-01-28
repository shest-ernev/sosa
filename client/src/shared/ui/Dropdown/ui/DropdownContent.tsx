import { forwardRef } from 'react'
import { DropdownMenu } from 'radix-ui'
import cn from 'clsx'

import styles from '../styles/index.module.scss'

export const DropdownContent = forwardRef<
  HTMLDivElement,
  DropdownMenu.DropdownMenuContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className={cn(styles.content, className)}
        ref={ref}
        {...props}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  )
})
