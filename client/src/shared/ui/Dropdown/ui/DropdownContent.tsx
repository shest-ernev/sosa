import { DropdownMenu } from 'radix-ui'
import cn from 'clsx'

import styles from '../styles/index.module.scss'
import { DropdownContentProps } from '../types'

export const DropdownContent = ({
  className,
  children,
  ...props
}: DropdownContentProps) => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className={cn(styles.content, className)}
        {...props}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  )
}
