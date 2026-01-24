import { forwardRef } from 'react'
import { ScrollArea } from 'radix-ui'
import cn from 'clsx'

import styles from '../styles/index.module.scss'

export const ScrollAreaScrollbar = forwardRef<
  HTMLDivElement,
  ScrollArea.ScrollAreaScrollbarProps
>(({ className, ...props }, ref) => (
  <ScrollArea.Scrollbar
    ref={ref}
    className={cn(styles.scrollBar, className)}
    {...props}
  >
    <ScrollArea.Thumb className={styles.thumb} />
  </ScrollArea.Scrollbar>
))
