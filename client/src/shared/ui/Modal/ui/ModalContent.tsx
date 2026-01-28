import { forwardRef } from 'react'
import { Dialog } from 'radix-ui'
import cn from 'clsx'

import styles from '../styles/index.module.scss'

export const ModalContent = forwardRef<
  HTMLDivElement,
  Dialog.DialogContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content
        className={cn(styles.content, className)}
        ref={ref}
        {...props}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
})
