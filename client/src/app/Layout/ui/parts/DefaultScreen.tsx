import { observer } from 'mobx-react-lite'

import { Header, Library, Toaster } from '@/widgets'
import { useStore } from '@/shared/hooks'

import { DefaultScreenProps } from '../../types'
import styles from '../../styles/index.module.scss'

export const DefaultScreen = observer(({ children }: DefaultScreenProps) => {
  const { auth } = useStore()

  return (
    <div className={styles.defaultScreen}>
      <Header />
      <div className={styles.defaultScreenContent}>
        {auth.isAuth && <Library />}
        <div className={styles.defaultScreenPages}>
          {children}
          <Toaster />
        </div>
      </div>
    </div>
  )
})
