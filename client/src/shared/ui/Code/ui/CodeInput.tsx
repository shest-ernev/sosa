import { unstable_OneTimePasswordField as OneTimePasswordField } from 'radix-ui'
import cn from 'clsx'

import { useCodeContext } from '../hooks'
import { CodeInputProps } from '../types'
import styles from '../styles/index.module.scss'

export const CodeInput = ({ className, ...props }: CodeInputProps) => {
  const { error, loading } = useCodeContext()

  return (
    <OneTimePasswordField.Input
      className={cn(
        styles.input,
        error && styles.error,
        loading && styles.loading,
        className,
      )}
      {...props}
    />
  )
}
