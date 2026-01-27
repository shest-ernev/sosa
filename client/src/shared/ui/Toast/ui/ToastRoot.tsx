import { forwardRef } from 'react'
import { Toast } from 'radix-ui'
import cn from 'clsx'

import styles from '../styles/index.module.scss'

export const ToastRoot = forwardRef<HTMLLIElement, Toast.ToastProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Toast.Root
        ref={ref}
        className={cn(styles.toast, className)}
        {...props}
      >
        {children}
      </Toast.Root>
    )
  },
)
