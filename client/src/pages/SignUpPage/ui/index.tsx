import { ScrollArea } from '@/shared/ui'
import { SignUpForm } from '@/features'

import styles from '../styles/index.module.scss'

export const SignUpPage = () => {
  return (
    <ScrollArea.Root className={styles.page}>
      <div className={styles.container}>
        <SignUpForm />
      </div>
      <ScrollArea.Scrollbar orientation='vertical' />
    </ScrollArea.Root>
  )
}
