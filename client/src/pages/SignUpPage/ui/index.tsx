import { useNavigate } from 'react-router'

import { routes } from '@/shared/config'
import { PageLayout } from '@/shared/layouts'
import { SignUpForm } from '@/features'
import { Footer } from '@/widgets'

export const SignUpPage = () => {
  const navigate = useNavigate()

  return (
    <PageLayout
      title='pages.signUp'
      onBack={() => navigate(routes.home)}
    >
      <SignUpForm />
      <Footer />
    </PageLayout>
  )
}
