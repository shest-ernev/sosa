import { forwardRef } from 'react'
import { Switch } from 'radix-ui'
import cn from 'clsx'

import { useSwitchContext } from '../../hooks'
import styles from '../../styles/index.module.scss'

export const SwitchThumb = forwardRef<HTMLSpanElement, Switch.SwitchThumbProps>(
  ({ className, ...props }, ref) => {
    const { animate } = useSwitchContext()

    return (
      <Switch.Thumb
        className={cn(styles.thumb, animate && styles.animation, className)}
        ref={ref}
        {...props}
      />
    )
  },
)
