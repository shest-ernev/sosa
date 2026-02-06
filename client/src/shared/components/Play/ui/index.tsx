import cn from 'clsx'

import { Button } from '@/shared/ui'
import PlayIcon from '@/shared/assets/svg/play.svg?react'
import PauseIcon from '@/shared/assets/svg/pause.svg?react'

import { PlayProps } from '../types'
import styles from '../styles/index.module.scss'

export const Play = ({ play, className, onPlay, onPause }: PlayProps) => {
  const handleClick = () => {
    if (play) {
      onPause?.()
    } else {
      onPlay?.()
    }
  }

  return (
    <Button
      className={cn(styles.btn, className)}
      color='primary'
      onClick={handleClick}
    >
      {play ? <PauseIcon /> : <PlayIcon className={styles.playIcon} />}
    </Button>
  )
}
