import { Select } from 'radix-ui'
import cn from 'clsx'

import ChevronDownIcon from '@/shared/assets/svg/chevronDown.svg?react'

import { SelectTriggerProps } from '../types'
import styles from '../styles/index.module.scss'

export const SelectTrigger = ({
  className,
  children,
  icon = true,
  ...props
}: SelectTriggerProps) => {
  return (
    <Select.Trigger
      className={cn(styles.trigger, className)}
      {...props}
    >
      {children}
      {icon && <ChevronDownIcon className={styles.icon} />}
    </Select.Trigger>
  )
}
