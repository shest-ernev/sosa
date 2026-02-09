import { PageLayout } from '@/shared/layouts'
import { UserSettings } from '@/features'
import { Footer } from '@/widgets'

export const SettingsPage = () => {
  return (
    <PageLayout title='pages.settings'>
      <UserSettings />
      <Footer />
    </PageLayout>
  )
}
