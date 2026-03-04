import { Dialog } from 'radix-ui'
import cn from 'clsx'

import { ModalProps } from '../types'
import styles from '../styles/index.module.scss'

export const ModalContent = ({ className, children, ...props }: ModalProps) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content
        className={cn(styles.content, className)}
        {...props}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
}
