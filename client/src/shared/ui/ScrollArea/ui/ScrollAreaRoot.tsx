import { ScrollArea } from 'radix-ui'
import cn from 'clsx'

import { ScrollAreaScrollbar } from './ScrollAreaScrollbar'

import { ScrollAreaRootProps } from '../types'
import styles from '../styles/index.module.scss'

export const ScrollAreaRoot = ({
  className,
  children,
  ref,
  ...props
}: ScrollAreaRootProps) => (
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
)
