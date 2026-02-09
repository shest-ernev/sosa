import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Switch, Text } from '@/shared/ui'
import { useDebounce } from '@/shared/hooks'

import { useEditSettings } from '../../hooks'
import { UserSettingsPrivacyProps } from '../../types'
import styles from '../../styles/index.module.scss'

export const UserSettingsPrivacy = ({
  defaultLibrary,
  defaultProfile,
  defaultSubscribers,
}: UserSettingsPrivacyProps) => {
  const { t } = useTranslation()
  const [edit, isLoading] = useEditSettings()
  const [settings, setSettings] = useState({
    library: defaultLibrary,
    profile: defaultProfile,
    subs: defaultSubscribers,
  })

  const handleChange = (key: keyof typeof settings, v: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: v }))
  }

  useDebounce(
    async () =>
      await edit({
        privateLibrary: settings.library,
        privateProfile: settings.profile,
        privateSubscribers: settings.subs,
      }),
    600,
    [settings],
  )

  return (
    <div className={styles.section}>
      <Text
        weight={700}
        color='primary'
        size='l'
      >
        {t('userSettings.security')}
      </Text>
      <label className={styles.item}>
        <Text>{t('userSettings.privacyProfile')}</Text>
        <Switch
          checked={settings.profile}
          onCheckedChange={(v) => handleChange('profile', v)}
          disabled={isLoading}
        />
      </label>
      <label className={styles.item}>
        <Text>{t('userSettings.privacyLibrary')}</Text>
        <Switch
          checked={settings.library}
          onCheckedChange={(v) => handleChange('library', v)}
          disabled={isLoading}
        />
      </label>
      <label className={styles.item}>
        <Text>{t('userSettings.privacySubscribers')}</Text>
        <Switch
          checked={settings.subs}
          onCheckedChange={(v) => handleChange('subs', v)}
          disabled={isLoading}
        />
      </label>
    </div>
  )
}
