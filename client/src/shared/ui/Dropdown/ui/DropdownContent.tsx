import { DropdownMenu } from 'radix-ui'
import cn from 'clsx'

import styles from '../styles/index.module.scss'
import { DropdownContentProps } from '../types'

export const DropdownContent = ({
  className,
  children,
  sideOffset = 10,
  ...props
}: DropdownContentProps) => {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        sideOffset={sideOffset}
        className={cn(styles.content, className)}
        {...props}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  )
}
