import { useTranslation } from 'react-i18next'

import { Switch, Text } from '@/shared/ui'

import { useEditSettings } from '../../hooks'
import { UserSettingsPrivacyProps } from '../../types'
import styles from '../../styles/index.module.scss'

export const UserSettingsPrivacy = ({
  defaultLibrary,
  defaultProfile,
  defaultSubscribers,
}: UserSettingsPrivacyProps) => {
  const { t } = useTranslation()

  const [library, setLibrary, isLibraryPending] = useEditSettings(
    'privateLibrary',
    defaultLibrary,
  )

  const [profile, setProfile, isProfilePending] = useEditSettings(
    'privateProfile',
    defaultProfile,
  )

  const [subscribers, setSubscribers, isSubscribersPending] = useEditSettings(
    'privateSubscribers',
    defaultSubscribers,
  )

  return (
    <div className={styles.section}>
      <Text
        weight={700}
        color='primary'
        size='l'
      >
        {t('userSettings.privacy')}
      </Text>
      <label className={styles.item}>
        <Text>{t('userSettings.privacyProfile')}</Text>
        <Switch
          checked={profile}
          onCheckedChange={(v) => setProfile(v)}
          disabled={isProfilePending}
        />
      </label>
      <label className={styles.item}>
        <Text>{t('userSettings.privacyLibrary')}</Text>
        <Switch
          checked={library}
          disabled={isLibraryPending}
          onCheckedChange={(v) => setLibrary(v)}
        />
      </label>
      <label className={styles.item}>
        <Text>{t('userSettings.privacySubscribers')}</Text>
        <Switch
          checked={subscribers}
          onCheckedChange={(v) => setSubscribers(v)}
          disabled={isSubscribersPending}
        />
      </label>
    </div>
  )
}
