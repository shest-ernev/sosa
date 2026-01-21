import { forwardRef, FocusEvent } from 'react'
import cn from 'clsx'

import { InputTextProps } from '../types'
import { useInputContext } from '../hooks'
import styles from '../styles/index.module.scss'

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ className, onFocus, onBlur, ...props }, ref) => {
    const { type, setFocus } = useInputContext()

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      setFocus(true)
      onFocus?.(e)
    }

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      setFocus(false)
      onBlur?.(e)
    }

    return (
      <input
        className={cn(styles.text, className)}
        type={type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={ref}
        {...props}
      />
    )
  },
)
