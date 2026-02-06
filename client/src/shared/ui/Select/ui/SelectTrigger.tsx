import { forwardRef } from 'react'
import { Select } from 'radix-ui'
import cn from 'clsx'

import ChevronDownIcon from '@/shared/assets/svg/chevronDown.svg?react'

import { SelectTriggerProps } from '../types'
import styles from '../styles/index.module.scss'

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, icon = true, ...props }, ref) => {
    return (
      <Select.Trigger
        className={cn(styles.trigger, className)}
        ref={ref}
        {...props}
      >
        {children}
        {icon && <ChevronDownIcon className={styles.icon} />}
      </Select.Trigger>
    )
  },
)
