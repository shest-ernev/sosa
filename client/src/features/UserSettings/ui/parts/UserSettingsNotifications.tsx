import { useTranslation } from 'react-i18next'

import { Text, Switch } from '@/shared/ui'

import { useEditSettings } from '../../hooks'
import { UserSettingsNotificationsProps } from '../../types'
import styles from '../../styles/index.module.scss'

export const UserSettingsNotifications = ({
  defaultNewRelease,
  defaultNewComment,
  defaultNewLike,
  defaultNewRepost,
  defaultNewSubs,
}: UserSettingsNotificationsProps) => {
  const { t } = useTranslation()

  const [release, setRelease, isReleasePending] = useEditSettings(
    'notificationsNewRelease',
    defaultNewRelease,
  )

  const [comment, setComment, isCommentPending] = useEditSettings(
    'notificationsComment',
    defaultNewComment,
  )

  const [like, setLike, isLikePending] = useEditSettings(
    'notificationsLike',
    defaultNewLike,
  )

  const [repost, setRepost, isRepostPending] = useEditSettings(
    'notificationsRepost',
    defaultNewRepost,
  )

  const [subs, setSubs, isSubsPending] = useEditSettings(
    'notificationsRepost',
    defaultNewSubs,
  )

  return (
    <div className={styles.section}>
      <Text
        weight={700}
        size='l'
        color='primary'
      >
        {t('userSettings.notifications')}
      </Text>
      <div className={styles.sectionItems}>
        <label className={styles.item}>
          <Text>{t('userSettings.notificationNewRelease')}</Text>
          <Switch
            checked={release}
            onCheckedChange={(v) => setRelease(v)}
            disabled={isReleasePending}
          />
        </label>
        <label className={styles.item}>
          <Text>{t('userSettings.notificationsComment')}</Text>
          <Switch
            checked={comment}
            onCheckedChange={(v) => setComment(v)}
            disabled={isCommentPending}
          />
        </label>
        <label className={styles.item}>
          <Text>{t('userSettings.notificationsLike')}</Text>
          <Switch
            checked={like}
            onCheckedChange={(v) => setLike(v)}
            disabled={isLikePending}
          />
        </label>
        <label className={styles.item}>
          <Text>{t('userSettings.notificationsRepost')}</Text>
          <Switch
            checked={repost}
            onCheckedChange={(v) => setRepost(v)}
            disabled={isRepostPending}
          />
        </label>
        <label className={styles.item}>
          <Text>{t('userSettings.notitficationsNewSubs')}</Text>
          <Switch
            checked={subs}
            onCheckedChange={(v) => setSubs(v)}
            disabled={isSubsPending}
          />
        </label>
      </div>
    </div>
  )
}
