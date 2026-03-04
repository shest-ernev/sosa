import cn from 'clsx'

import CheckIcon from '@/shared/assets/svg/check.svg?react'

import { CheckboxProps } from '../types'
import styles from '../styles/index.module.scss'

export const Checkbox = ({ className, error, ...props }: CheckboxProps) => {
  return (
    <label className={cn(styles.container, className)}>
      <input
        type='checkbox'
        className={styles.input}
        {...props}
      />
      <span className={cn(styles.checkbox, error && styles.error)}>
        <CheckIcon />
      </span>
    </label>
  )
}
