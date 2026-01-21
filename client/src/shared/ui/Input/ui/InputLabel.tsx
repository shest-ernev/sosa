import { forwardRef } from 'react'
import cn from 'clsx'

import { InpuLabelProps } from '../types'
import { useInputContext } from '../hooks'
import styles from '../styles/index.module.scss'

export const InputLabel = forwardRef<HTMLLabelElement, InpuLabelProps>(
  ({ className, children, ...props }, ref) => {
    const { focus, error } = useInputContext()

    return (
      <label
        className={cn(
          styles.root,
          focus && styles.rootFocus,
          error && styles.rootError,
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </label>
    )
  },
)
