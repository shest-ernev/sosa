import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui'
import { routes } from '@/shared/config'
import LogoIcon from '@/shared/assets/svg/logo.svg?react'

import styles from '../styles/index.module.scss'

import { HeaderSearch } from './parts/HeaderSearch'
import { HeaderHomeLink } from './parts/HeaderHomeLink'

export const Header = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <LogoIcon className={styles.logo} />
      </div>
      <div className={styles.center}>
        <HeaderHomeLink />
        <HeaderSearch />
      </div>
      <div className={styles.authBtns}>
        <Button
          variant='outline'
          color='primary'
          className={styles.authBtn}
          asChild={true}
        >
          <Link to={routes.signUp}>{t('header.signUp')}</Link>
        </Button>
        <Button
          variant='contain'
          color='primary'
          className={styles.authBtn}
          asChild={true}
        >
          <Link to={routes.signIn}>{t('header.signIn')}</Link>
        </Button>
      </div>
    </div>
  )
}
