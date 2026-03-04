import cn from 'clsx'

import { SkeletonProps } from '../types'
import styles from '../styles/index.module.scss'

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(styles.block, className)}
      {...props}
    />
  )
}
