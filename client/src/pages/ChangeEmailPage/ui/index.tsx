import { ChangeEmailForm } from '@/features'
import { PageLayout } from '@/shared/layouts'
import { Footer } from '@/widgets'

export const ChangeEmailPage = () => {
  return (
    <PageLayout title='pages.changeEmail'>
      <ChangeEmailForm />
      <Footer />
    </PageLayout>
  )
}
