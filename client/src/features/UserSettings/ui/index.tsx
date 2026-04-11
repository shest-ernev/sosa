import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router'

import { useStore } from '@/shared/hooks'
import { Text } from '@/shared/ui'
import { useGetUserQuery, useGetUserSettingsQuery } from '@/shared/api'
import { routes } from '@/shared/config'

import styles from '../styles/index.module.scss'

import { UserSettingsView } from './parts/UserSettingsView'
import { UserSettingsNotifications } from './parts/UserSettingsNotifications'
import { UserSettingsSecurity } from './parts/UserSettingsSecurity'
import { UserSettingsPrivacy } from './parts/UserSettingsPrivacy'
import { UserSettingsLoading } from './parts/UserSettingsLoading'

export const UserSettings = observer(() => {
  const { auth } = useStore()
  const { t } = useTranslation()

  const { data: user, isLoading: isUserLoading } = useGetUserQuery()

  const { data: settings, isLoading: isSettingsLoading } =
    useGetUserSettingsQuery({
      enabled: auth.isAuth,
    })

  if (!auth.isAuth) {
    return (
      <Navigate
        to={routes.signIn}
        replace
      />
    )
  }

  if (isSettingsLoading || !settings?.data || isUserLoading || !user?.data) {
    return <UserSettingsLoading />
  }

  return (
    <div className={styles.container}>
      <Text
        className={styles.title}
        size='xl'
        tag='h1'
        color='primary'
        weight={700}
      >
        {t('userSettings.title')}
      </Text>
      <UserSettingsSecurity
        password={settings.data.password}
        email={user.data.email}
      />
      <UserSettingsView />
      <UserSettingsNotifications
        defaultNewComment={settings.data.notificationsComment}
        defaultNewLike={settings.data.notificationsLike}
        defaultNewRelease={settings.data.notificationsNewRelease}
        defaultNewRepost={settings.data.notificationsRepost}
        defaultNewSubs={settings.data.notificationsNewSubscriber}
      />
      <UserSettingsPrivacy
        defaultLibrary={settings.data.privateLibrary}
        defaultProfile={settings.data.privateProfile}
        defaultSubscribers={settings.data.privateSubscribers}
      />
    </div>
  )
})
