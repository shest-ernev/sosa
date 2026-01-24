import { forwardRef } from 'react'
import cn from 'clsx'

import CheckIcon from '@/shared/assets/svg/check.svg?react'

import { CheckboxProps } from '../types'
import styles from '../styles/index.module.scss'

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <label className={cn(styles.container, className)}>
        <input
          type='checkbox'
          className={styles.input}
          ref={ref}
          {...props}
        />
        <span className={cn(cn(styles.checkbox, error && styles.error))}>
          <CheckIcon />
        </span>
      </label>
    )
  },
)
