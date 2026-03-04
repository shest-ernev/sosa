import { Select } from 'radix-ui'
import cn from 'clsx'

import ChevronUpIcon from '@/shared/assets/svg/chevronUp.svg?react'
import ChevronDownIcon from '@/shared/assets/svg/chevronDown.svg?react'

import { SelectContentProps } from '../types'
import styles from '../styles/index.module.scss'

export const SelectContent = ({
  className,
  children,
  ...props
}: SelectContentProps) => {
  return (
    <Select.Portal>
      <Select.Content
        className={cn(styles.content, className)}
        {...props}
      >
        <Select.ScrollUpButton className={styles.scrollButton}>
          <ChevronUpIcon className={styles.chevron} />
        </Select.ScrollUpButton>
        <Select.Viewport className={styles.viewport}>
          {children}
        </Select.Viewport>
        <Select.ScrollDownButton className={styles.scrollButton}>
          <ChevronDownIcon className={styles.chevron} />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  )
}
