import { ReactNode } from 'react'
import cn from 'clsx'

import { useFullScreen } from '../hooks'
import styles from '../styles/index.module.scss'

import { DefaultScreen } from './parts/DefaultScreen'
import { FullScreen } from './parts/FullScreen'

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const [isFullScreen] = useFullScreen()

  return (
    <div className={styles.wrapper}>
      <div
        className={cn(
          styles.container,
          isFullScreen && styles.containerFullScreen
        )}
      >
        <DefaultScreen>{children}</DefaultScreen>
        <FullScreen />
      </div>
    </div>
  )
}
