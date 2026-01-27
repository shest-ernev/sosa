import { forwardRef } from 'react'
import { unstable_OneTimePasswordField as OneTimePasswordField } from 'radix-ui'
import cn from 'clsx'

import { useCodeContext } from '../hooks'
import styles from '../styles/index.module.scss'

export const CodeInput = forwardRef<
  HTMLInputElement,
  OneTimePasswordField.OneTimePasswordFieldInputProps
>(({ className, ...props }, ref) => {
  const { error, loading } = useCodeContext()

  return (
    <OneTimePasswordField.Input
      className={cn(
        styles.input,
        error && styles.error,
        loading && styles.loading,
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
