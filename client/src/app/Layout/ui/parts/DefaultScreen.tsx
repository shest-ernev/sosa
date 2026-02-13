import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { Header, Library, Player, Toaster } from '@/widgets'
import { useStore } from '@/shared/hooks'

import { DefaultScreenProps } from '../../types'
import styles from '../../styles/index.module.scss'

export const DefaultScreen = observer(({ children }: DefaultScreenProps) => {
  const pageRef = useRef<HTMLDivElement>(null)
  const { auth } = useStore()

  useEffect(() => {
    const resize = () => {
      if (!pageRef.current) return

      document.documentElement.style.setProperty(
        '--page-height',
        `${pageRef.current.offsetHeight / 16}rem`,
      )
    }

    resize()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className={styles.defaultScreen}>
      <Header />
      <div className={styles.defaultScreenContent}>
        {auth.isAuth && <Library />}
        <div
          className={styles.defaultScreenPages}
          ref={pageRef}
        >
          {children}
          <Toaster />
        </div>
      </div>
      <Player />
    </div>
  )
})
