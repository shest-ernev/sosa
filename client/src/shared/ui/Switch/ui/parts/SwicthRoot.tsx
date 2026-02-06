import { forwardRef, MouseEvent } from 'react'
import { Switch } from 'radix-ui'
import cn from 'clsx'

import { useSwitchContext } from '../../hooks'
import styles from '../../styles/index.module.scss'

export const SwitchRoot = forwardRef<HTMLButtonElement, Switch.SwitchProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const { setAnimate } = useSwitchContext()

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      setAnimate(true)

      onClick?.(e)
    }

    return (
      <Switch.Root
        onClick={handleClick}
        className={cn(styles.root, className)}
        ref={ref}
        {...props}
      >
        <div className={styles.container}>{children}</div>
      </Switch.Root>
    )
  },
)
