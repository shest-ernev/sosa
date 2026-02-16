import { useNavigate } from 'react-router'

import { routes } from '@/shared/config'
import { PageLayout } from '@/shared/layouts'
import { SignInForm } from '@/features'
import { Footer } from '@/widgets'

export const SignInPage = () => {
  const navigate = useNavigate()

  return (
    <PageLayout
      title='pages.signIn'
      onBack={() => navigate(routes.home)}
    >
      <SignInForm />
      <Footer />
    </PageLayout>
  )
}
