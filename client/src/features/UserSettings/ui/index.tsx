import { useGetUserSettingsQuery } from '@/shared/api'
import styles from '../styles/index.module.scss'

import { UserSettingsView } from './parts/UserSettingsView'
import { UserSettingsNotifications } from './parts/UserSettingsNotifications'

export const UserSettings = () => {
  const { data, isLoading } = useGetUserSettingsQuery()

  if (isLoading || !data?.data) {
    return <>...loading</>
  }

  return (
    <div className={styles.container}>
      <UserSettingsView />
      <UserSettingsNotifications
        defaultNewComment={data.data.notificationsComment}
        defaultNewLike={data.data.notificationsLike}
        defaultNewRelease={data.data.notificationsNewRelease}
        defaultNewRepost={data.data.notificationsRepost}
        defaultNewSubs={data.data.notificationsNewSubscriber}
      />
    </div>
  )
}
