import { Switch } from 'radix-ui'
import cn from 'clsx'

import { SwitchThumbProps } from '../../types'
import { useSwitchContext } from '../../hooks'
import styles from '../../styles/index.module.scss'

export const SwitchThumb = ({ className, ...props }: SwitchThumbProps) => {
  const { animate } = useSwitchContext()

  return (
    <Switch.Thumb
      className={cn(styles.thumb, animate && styles.animation, className)}
      {...props}
    />
  )
}
