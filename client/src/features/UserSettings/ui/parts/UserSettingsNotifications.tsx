import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Text, Switch } from '@/shared/ui'
import { useDebounce } from '@/shared/hooks'

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
  const [edit, isEditPending] = useEditSettings()
  const [settings, setSettings] = useState({
    newRelease: defaultNewRelease,
    newComment: defaultNewComment,
    newLike: defaultNewLike,
    newRepost: defaultNewRepost,
    newSubs: defaultNewSubs,
  })

  const handleChange = (key: keyof typeof settings, v: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: v }))
  }

  useDebounce(
    async () =>
      await edit({
        notificationsComment: settings.newComment,
        notificationsLike: settings.newLike,
        notificationsNewRelease: settings.newRelease,
        notificationsNewSubscriber: settings.newSubs,
        notificationsRepost: settings.newRepost,
      }),
    600,
    [settings],
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
            checked={settings.newRelease}
            onCheckedChange={(v) => handleChange('newRelease', v)}
          />
        </label>
        <label className={styles.item}>
          <Text>{t('userSettings.notificationsComment')}</Text>
          <Switch
            checked={settings.newComment}
            onCheckedChange={(v) => handleChange('newComment', v)}
          />
        </label>
        <label className={styles.item}>
          <Text>{t('userSettings.notificationsLike')}</Text>
          <Switch
            checked={settings.newLike}
            onCheckedChange={(v) => handleChange('newLike', v)}
          />
        </label>
        <label className={styles.item}>
          <Text>{t('userSettings.notificationsRepost')}</Text>
          <Switch
            checked={settings.newRepost}
            onCheckedChange={(v) => handleChange('newRepost', v)}
          />
        </label>
        <label className={styles.item}>
          <Text>{t('userSettings.notitficationsNewSubs')}</Text>
          <Switch
            checked={settings.newSubs}
            onCheckedChange={(v) => handleChange('newSubs', v)}
          />
        </label>
      </div>
    </div>
  )
}
