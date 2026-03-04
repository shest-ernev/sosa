import { DropdownMenu } from 'radix-ui'
import cn from 'clsx'

import { DropdownItemProps } from '../types'
import styles from '../styles/index.module.scss'

export const DropdownItem = ({
  className,
  children,
  ...props
}: DropdownItemProps) => {
  return (
    <DropdownMenu.Label
      className={cn(styles.item, className)}
      {...props}
    >
      {children}
    </DropdownMenu.Label>
  )
}
