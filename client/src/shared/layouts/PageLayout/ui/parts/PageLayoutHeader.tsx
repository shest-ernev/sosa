import { useState } from 'react'
import { useNavigate } from 'react-router'
import cn from 'clsx'

import { Button, Text } from '@/shared/ui'
import { Play } from '@/shared/components'
import ChevronLeftIcon from '@/shared/assets/svg/chevronLeft.svg?react'

import { PageLayoutHeaderProps } from '../../types'
import styles from '../../styles/index.module.scss'

export const PageLayoutHeader = ({
  title,
  hidden,
  play,
  onPlay,
  onPause,
  onBack,
}: PageLayoutHeaderProps) => {
  const navigate = useNavigate()

  return (
    <header className={cn(styles.header, hidden && styles.hidden)}>
      <div className={styles.left}>
        <Button
          className={styles.back}
          onClick={onBack || (() => navigate(-1))}
        >
          <ChevronLeftIcon />
        </Button>
        <Text
          size='l'
          weight={700}
          color='primary'
          className={styles.title}
        >
          {title}
        </Text>
      </div>
      {play !== undefined && (
        <Play
          className={styles.playBtn}
          onPause={onPause}
          onPlay={onPlay}
          play={play}
        />
      )}
    </header>
  )
}
