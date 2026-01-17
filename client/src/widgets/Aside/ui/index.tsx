import { observer } from 'mobx-react-lite'
import cn from 'clsx'

import { Text } from '@/shared/ui'
import LogoIcon from '@/shared/assets/svg/logo.svg?react'

import { useResizeAside } from '../hooks'
import styles from '../styles/index.module.scss'

export const Aside = observer(() => {
  const { width, startResizing, isResizing, hidden, toggleHidden } =
    useResizeAside({
      min: 200,
      max: 400,
      hiddenWidth: 70,
    })

  return (
    <div className={styles.container}>
      <div
        className={styles.aside}
        style={{ width }}
      >
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <LogoIcon />
          </div>
          {!hidden && (
            <Text
              size='xl'
              weight={700}
              color='primary'
              className={styles.name}
            >
              Sosa
            </Text>
          )}
        </div>
      </div>
      <button
        className={styles.resize}
        onMouseDown={startResizing}
        onDoubleClick={toggleHidden}
      >
        <div
          className={cn(
            styles.resizeThumb,
            isResizing && styles.resizeThumbActive
          )}
        />
      </button>
    </div>
  )
})
