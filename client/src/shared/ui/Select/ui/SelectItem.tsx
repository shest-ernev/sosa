import { forwardRef } from 'react'
import { Select } from 'radix-ui'
import cn from 'clsx'

import CheckIcon from '@/shared/assets/svg/check.svg?react'

import styles from '../styles/index.module.scss'

export const SelectItem = forwardRef<HTMLDivElement, Select.SelectItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Select.Item
        ref={ref}
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
  },
)
