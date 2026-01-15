import { forwardRef, createElement } from 'react'
import cn from 'clsx'

import { TextProps } from '../types'
import styles from '../styles/index.module.scss'

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      className,
      size = 'm',
      color = 'secondary',
      tag = 'span',
      weight = 400,
      children,
      style,
      ...props
    },
    ref
  ) => {
    return createElement(
      tag,
      {
        className: cn(styles.text, styles[color], styles[size], className),
        ref,
        style: {
          fontWeight: weight,
          ...style,
        },
        ...props,
      },
      children
    )
  }
)
