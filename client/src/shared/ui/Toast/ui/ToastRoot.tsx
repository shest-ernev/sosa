import { Toast } from 'radix-ui'
import cn from 'clsx'

import { ToastRootProps } from '../types'
import styles from '../styles/index.module.scss'

export const ToastRoot = ({
  children,
  className,
  ...props
}: ToastRootProps) => {
  return (
    <Toast.Root
      className={cn(styles.toast, className)}
      {...props}
    >
      {children}
    </Toast.Root>
  )
}
