import { forwardRef } from 'react'
import { Select } from 'radix-ui'
import cn from 'clsx'

import ChevronUpIcon from '@/shared/assets/svg/chevronUp.svg?react'
import ChevronDownIcon from '@/shared/assets/svg/chevronDown.svg?react'

import styles from '../styles/index.module.scss'

export const SelectContent = forwardRef<
  HTMLDivElement,
  Select.SelectContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <Select.Portal>
      <Select.Content
        className={cn(styles.content, className)}
        ref={ref}
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
})
