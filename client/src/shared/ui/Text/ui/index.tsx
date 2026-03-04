import { ElementType } from 'react'
import cn from 'clsx'

import { TextProps } from '../types'
import styles from '../styles/index.module.scss'

export const Text = ({
  className,
  size = 'm',
  color = 'secondary',
  tag = 'span',
  weight = 400,
  children,
  style,
  ...props
}: TextProps) => {
  const Comp = tag as ElementType

  return (
    <Comp
      className={cn(styles.text, styles[color], styles[size], className)}
      style={{
        fontWeight: weight,
        ...style,
      }}
      {...props}
    >
      {children}
    </Comp>
  )
}
