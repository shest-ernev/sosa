import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router'

import { routes } from '@/shared/config'
import { useStore } from '@/shared/hooks'
import { PageLayout } from '@/shared/layouts'
import { ChangePasswordForm } from '@/features'
import { Footer } from '@/widgets'

export const ChangePasswordPage = observer(() => {
  const navigate = useNavigate()
  const { auth } = useStore()

  return (
    <PageLayout
      title='pages.changePassword'
      onBack={() => navigate(auth.isAuth ? routes.settings : routes.signIn)}
    >
      <ChangePasswordForm />
      <Footer />
    </PageLayout>
  )
})
