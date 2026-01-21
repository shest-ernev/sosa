import { Header, Library } from '@/widgets'

import { DefaultScreenProps } from '../../types'
import styles from '../../styles/index.module.scss'

export const DefaultScreen = ({ children }: DefaultScreenProps) => {
  return (
    <div className={styles.defaultScreen}>
      <Header />
      <div className={styles.defaultScreenContent}>
        <Library />
        <div className={styles.defaultScreenPages}>{children}</div>
      </div>
    </div>
  )
}
