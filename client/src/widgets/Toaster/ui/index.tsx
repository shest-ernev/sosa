import { observer } from 'mobx-react-lite'
import cn from 'clsx'

import { useStore } from '@/shared/hooks'
import { Button, Text, Toast } from '@/shared/ui'
import DangerIcon from '@/shared/assets/svg/danger.svg?react'
import SuccessIcon from '@/shared/assets/svg/success.svg?react'
import InfoIcon from '@/shared/assets/svg/info.svg?react'
import CloseIcon from '@/shared/assets/svg/close.svg?react'

import styles from '../styles/index.module.scss'

export const Toaster = observer(() => {
  const { toast } = useStore()

  const iconVariants = {
    danger: DangerIcon,
    success: SuccessIcon,
    info: InfoIcon,
  }

  const handleOpenChange = (v: boolean, id: string) => {
    if (!v) {
      setTimeout(() => toast.removeToast(id), 150)
    }
  }

  return (
    <Toast.Provider>
      {[...toast.toasts].reverse().map((obj, index) => {
        const Icon = iconVariants[obj.type]

        return (
          <Toast.Root
            key={obj.id}
            className={cn(styles.toast, index > 2 && styles.closed)}
            onOpenChange={(v) => handleOpenChange(v, obj.id)}
            style={{
              translate: `0 -${120 * index}%`,
            }}
          >
            <div className={styles.content}>
              <Icon className={styles[obj.type]} />
              <Text className={styles[obj.type]}>{obj.text}</Text>
            </div>
            <Toast.Close asChild={true}>
              <Button className={styles.close}>
                <CloseIcon />
              </Button>
            </Toast.Close>
          </Toast.Root>
        )
      })}
      <Toast.Viewport className={styles.viewport} />
    </Toast.Provider>
  )
})
