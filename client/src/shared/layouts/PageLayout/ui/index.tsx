import { forwardRef, useState, UIEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import cn from 'clsx'

import { ScrollArea } from '@/shared/ui'

import { PageLayoutProps } from '../types'
import styles from '../styles/index.module.scss'

import { PageLayoutHeader } from './parts/PageLayoutHeader'

export const PageLayout = forwardRef<HTMLDivElement, PageLayoutProps>(
  (
    {
      children,
      className,
      viewHeader = 1,
      title,
      play,
      onPlay,
      onPause,
      onBack,
      onScroll,
      ...props
    },
    ref,
  ) => {
    const [isHidden, setIsHidden] = useState(!!viewHeader)
    const { t } = useTranslation()

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
      if (e.currentTarget.scrollTop >= viewHeader) {
        setIsHidden(false)
      } else {
        setIsHidden(true)
      }

      onScroll?.(e)
    }

    return (
      <>
        <Helmet title={t(title)} />
        <PageLayoutHeader
          title={title}
          onBack={onBack}
          hidden={isHidden}
          play={play}
          onPlay={onPlay}
          onPause={onPause}
        />
        <ScrollArea.Root
          onScroll={handleScroll}
          ref={ref}
          className={cn(styles.scroll, className)}
          {...props}
        >
          <div className={styles.container}>{children}</div>
          <ScrollArea.Scrollbar orientation='vertical' />
        </ScrollArea.Root>
      </>
    )
  },
)
