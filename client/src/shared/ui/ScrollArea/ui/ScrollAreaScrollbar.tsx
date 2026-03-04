import { ScrollArea } from 'radix-ui'
import cn from 'clsx'

import { ScrollAreaScrollbarPropsProps } from '../types'
import styles from '../styles/index.module.scss'

export const ScrollAreaScrollbar = ({
  className,
  ref,
  ...props
}: ScrollAreaScrollbarPropsProps) => (
  <ScrollArea.Scrollbar
    ref={ref}
    className={cn(styles.scrollBar, className)}
    {...props}
  >
    <ScrollArea.Thumb className={styles.thumb} />
  </ScrollArea.Scrollbar>
)
