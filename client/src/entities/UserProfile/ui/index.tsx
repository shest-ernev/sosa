import cn from 'clsx'
import { useTranslation } from 'react-i18next'

import { Avatar, Button, Markdown, Text } from '@/shared/ui'
import { formatNumber, getStatic } from '@/shared/lib'

import { UserProfileProps } from '../types'
import styles from '../styles/index.module.scss'

export const UserProfile = ({
  cover,
  name,
  avatar,
  subscribers,
  listeners,
  description,
  after,
}: UserProfileProps) => {
  const { t } = useTranslation()

  return (
    <div className={styles.user}>
      {cover && (
        <div
          className={styles.cover}
          style={{ backgroundImage: `url(${getStatic(cover)})` }}
        >
          <div className={styles.backdrop} />
        </div>
      )}
      <div className={cn(styles.info, cover && styles.infoWithCover)}>
        <Avatar
          className={styles.avatar}
          name={name}
          src={avatar ? getStatic(avatar) : undefined}
        />
        <div className={styles.params}>
          <Text
            color='primary'
            size='xxl'
            weight={700}
            className={cn(styles.name)}
          >
            {name}
          </Text>
          <div className={styles.btns}>
            <Button className={styles.paramsBtn}>
              {formatNumber(subscribers)} {t('profile.subscribers')}
            </Button>
            <Button className={styles.paramsBtn}>
              {formatNumber(listeners)} {t('profile.listeners')}
            </Button>
            {after}
          </div>
        </div>
      </div>
      {!!description && (
        <Markdown className={styles.description}>{description}</Markdown>
      )}
    </div>
  )
}
