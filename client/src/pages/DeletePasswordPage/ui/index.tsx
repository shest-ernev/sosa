import { DeletePasswordForm } from '@/features'
import { PageLayout } from '@/shared/layouts'
import { Footer } from '@/widgets'

export const DeletePasswordPage = () => {
  return (
    <PageLayout title='pages.deletePassword'>
      <DeletePasswordForm />
      <Footer />
    </PageLayout>
  )
}
