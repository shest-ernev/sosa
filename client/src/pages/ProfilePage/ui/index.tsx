import { PageLayout } from '@/shared/layouts'
import { Footer } from '@/widgets'

import styles from '../styles/index.module.scss'

import { ProfileInfo } from './parts/ProfileInfo'

export const ProfilePage = () => {
  return (
    <PageLayout title='pages.profile'>
      <div className={styles.content}>
        <ProfileInfo />
      </div>
      <Footer />
    </PageLayout>
  )
}
