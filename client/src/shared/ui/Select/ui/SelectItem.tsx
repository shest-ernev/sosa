import { Select } from 'radix-ui'
import cn from 'clsx'

import CheckIcon from '@/shared/assets/svg/check.svg?react'

import { SelectItemProps } from '../types'
import styles from '../styles/index.module.scss'

export const SelectItem = ({
  className,
  children,
  ...props
}: SelectItemProps) => {
  return (
    <Select.Item
      className={cn(styles.item, className)}
      {...props}
    >
      <div className={styles.indicatorContainer}>
        <Select.ItemIndicator>
          <CheckIcon className={styles.indicatorIcon} />
        </Select.ItemIndicator>
      </div>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  )
}
