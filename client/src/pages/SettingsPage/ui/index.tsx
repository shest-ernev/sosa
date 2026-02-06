import { PageLayout } from '@/shared/layouts'
import { UserSettings } from '@/features'

export const SettingsPage = () => {
  return (
    <PageLayout title='Settings'>
      <UserSettings />
    </PageLayout>
  )
}
