import { PageLayout } from '@/shared/layouts'
import { SignUpForm } from '@/features'
import { Footer } from '@/widgets'

export const SignUpPage = () => {
  return (
    <PageLayout title='pages.signUp'>
      <SignUpForm />
      <Footer />
    </PageLayout>
  )
}
