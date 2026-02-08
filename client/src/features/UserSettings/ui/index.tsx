import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router'

import { useStore } from '@/shared/hooks'
import { useGetUserSettingsQuery } from '@/shared/api'
import { routes } from '@/shared/config'

import styles from '../styles/index.module.scss'

import { UserSettingsView } from './parts/UserSettingsView'
import { UserSettingsNotifications } from './parts/UserSettingsNotifications'
import { UserSettingsSecurity } from './parts/UserSettingsSecurity'

export const UserSettings = observer(() => {
  const { auth } = useStore()
  const { data: settings, isLoading: isSettingsLoading } =
    useGetUserSettingsQuery({
      enabled: auth.isAuth,
    })

  const loading = isSettingsLoading || !settings?.data

  if (!auth.isAuth) {
    return (
      <Navigate
        to={routes.signIn}
        replace
      />
    )
  }

  if (loading) {
    return <>...loading</>
  }

  return (
    <div className={styles.container}>
      <UserSettingsSecurity />
      <UserSettingsView />
      <UserSettingsNotifications
        defaultNewComment={settings.data.notificationsComment}
        defaultNewLike={settings.data.notificationsLike}
        defaultNewRelease={settings.data.notificationsNewRelease}
        defaultNewRepost={settings.data.notificationsRepost}
        defaultNewSubs={settings.data.notificationsNewSubscriber}
      />
    </div>
  )
})
