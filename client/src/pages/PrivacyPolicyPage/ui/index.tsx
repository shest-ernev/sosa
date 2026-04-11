import { PageLayout } from '@/shared/layouts'
import { Footer } from '@/widgets'

import { PrivacyPolicyContent } from './parts/PrivacyPolicyContent'

export const PrivacyPolicyPage = () => {
  return (
    <PageLayout title='pages.privacyPolicy'>
      <PrivacyPolicyContent />
      <Footer />
    </PageLayout>
  )
}
