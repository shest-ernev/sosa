import { Avatar as RadixAvatar } from 'radix-ui'
import cn from 'clsx'

import { AvatarProps } from '../types'
import styles from '../styles/index.module.scss'

export const Avatar = ({ src, name, className }: AvatarProps) => {
  return (
    <RadixAvatar.Root className={cn(styles.root, className)}>
      <RadixAvatar.Image
        className={styles.image}
        src={src}
        alt={name}
      />
      <RadixAvatar.Fallback className={styles.fallback}>
        {name ? name.toUpperCase().charAt(0) : ''}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  )
}
