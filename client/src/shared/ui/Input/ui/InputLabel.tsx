import cn from 'clsx'

import { InpuLabelProps } from '../types'
import { useInputContext } from '../hooks'
import styles from '../styles/index.module.scss'

export const InputLabel = ({
  className,
  children,
  ...props
}: InpuLabelProps) => {
  const { focus, error } = useInputContext()

  return (
    <label
      className={cn(
        styles.root,
        focus && styles.rootFocus,
        error && styles.rootError,
        className,
      )}
      {...props}
    >
      {children}
    </label>
  )
}
