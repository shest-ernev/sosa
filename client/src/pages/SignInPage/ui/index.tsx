import { ScrollArea } from '@/shared/ui'
import { SignInForm } from '@/features'

import styles from '../styles/index.module.scss'

export const SignInPage = () => {
  return (
    <ScrollArea.Root className={styles.page}>
      <div className={styles.container}>
        <SignInForm />
      </div>
      <ScrollArea.Scrollbar orientation='vertical' />
    </ScrollArea.Root>
  )
}
