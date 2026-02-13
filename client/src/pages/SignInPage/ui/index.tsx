import { PageLayout } from '@/shared/layouts'
import { SignInForm } from '@/features'
import { Footer } from '@/widgets'

export const SignInPage = () => {
  return (
    <PageLayout title='pages.signIn'>
      <SignInForm />
      <Footer />
    </PageLayout>
  )
}
