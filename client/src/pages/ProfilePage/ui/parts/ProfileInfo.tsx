import { useGetUserQuery } from '@/shared/api'
import { UserProfile } from '@/entities'
import { EditProfile } from '@/features'

import { ProfilePageLoading } from './ProfileInfoLoading'

export const ProfileInfo = () => {
  const { data, isLoading } = useGetUserQuery()

  if (isLoading || !data?.data) {
    return <ProfilePageLoading />
  }

  return (
    <UserProfile
      name={data.data.name}
      description={data.data.description}
      cover={data.data.cover}
      avatar={data.data.avatar}
      subscribers={10}
      listeners={10}
      after={
        <EditProfile
          avatar={!!data.data.avatar}
          cover={!!data.data.cover}
          name={data.data.name}
        />
      }
    />
  )
}
