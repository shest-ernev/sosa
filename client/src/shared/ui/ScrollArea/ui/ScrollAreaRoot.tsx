import { forwardRef } from 'react'
import { ScrollArea } from 'radix-ui'
import cn from 'clsx'

import { ScrollAreaScrollbar } from './ScrollAreaScrollbar'

import styles from '../styles/index.module.scss'

export const ScrollAreaRoot = forwardRef<HTMLDivElement, ScrollArea.ScrollAreaProps>(
  ({ className, children, ...props }, ref) => (
    <ScrollArea.Root
      ref={ref}
      className={cn(styles.root, className)}
    >
      <ScrollArea.Viewport
        className={styles.vieport}
        {...props}
      >
        {children}
      </ScrollArea.Viewport>
      <ScrollAreaScrollbar />
      <ScrollArea.Corner />
    </ScrollArea.Root>
  ),
)
