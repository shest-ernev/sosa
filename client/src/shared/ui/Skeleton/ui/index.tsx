import { forwardRef, HTMLAttributes } from 'react'
import cn from 'clsx'

import styles from '../styles/index.module.scss'

export const Skeleton = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(styles.block, className)}
      ref={ref}
      {...props}
    />
  )
})
