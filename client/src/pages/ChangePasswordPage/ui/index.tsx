import { ScrollArea } from '@/shared/ui'
import { ChangePasswordForm } from '@/features'

import styles from '../styles/index.module.scss'

export const ChangePasswordPage = () => {
  return (
    <ScrollArea.Root className={styles.page}>
      <div className={styles.container}>
        <ChangePasswordForm />
      </div>
      <ScrollArea.Scrollbar orientation='vertical' />
    </ScrollArea.Root>
  )
}
