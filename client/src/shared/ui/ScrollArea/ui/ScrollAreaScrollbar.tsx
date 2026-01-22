import { forwardRef } from 'react'
import { ScrollArea } from 'radix-ui'
import cn from 'clsx'

import styles from '../styles/index.module.scss'

export const ScrollAreaScrollbar = forwardRef<
  HTMLDivElement,
  ScrollArea.ScrollAreaScrollbarProps
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollArea.Scrollbar
    ref={ref}
    orientation={orientation}
    className={cn(styles.scrollBar, styles[orientation], className)}
    {...props}
  >
    <ScrollArea.Thumb className={styles.thumb} />
  </ScrollArea.Scrollbar>
))
