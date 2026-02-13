import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router'

import { useStore } from '@/shared/hooks'
import { Text } from '@/shared/ui'
import { useGetUserSettingsQuery } from '@/shared/api'
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
  const { data, isLoading } = useGetUserSettingsQuery({
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

  if (isLoading || !data?.data) {
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
      <UserSettingsSecurity password={data.data.password} />
      <UserSettingsView />
      <UserSettingsNotifications
        defaultNewComment={data.data.notificationsComment}
        defaultNewLike={data.data.notificationsLike}
        defaultNewRelease={data.data.notificationsNewRelease}
        defaultNewRepost={data.data.notificationsRepost}
        defaultNewSubs={data.data.notificationsNewSubscriber}
      />
      <UserSettingsPrivacy
        defaultLibrary={data.data.privateLibrary}
        defaultProfile={data.data.privateProfile}
        defaultSubscribers={data.data.privateSubscribers}
      />
    </div>
  )
})
