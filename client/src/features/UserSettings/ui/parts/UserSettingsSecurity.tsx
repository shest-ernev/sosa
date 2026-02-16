import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Text, Button } from '@/shared/ui'
import { routes } from '@/shared/config'
import PencilIcon from '@/shared/assets/svg/pencil.svg?react'
import TrashIcon from '@/shared/assets/svg/trash.svg?react'

import { UserSettingsSecurityProps } from '../../types'
import styles from '../../styles/index.module.scss'

export const UserSettingsSecurity = ({
  password,
}: UserSettingsSecurityProps) => {
  const { t } = useTranslation()

  return (
    <div className={styles.section}>
      <Text
        weight={700}
        color='primary'
        size='l'
      >
        {t('userSettings.security')}
      </Text>
      <label className={styles.item}>
        <Text>{t('userSettings.email')}</Text>
        <Button
          className={styles.editEmailBtn}
          asChild={true}
        >
          <Link to={routes.changeEmail}>
            <span>{t('userSettings.editEmail')}</span>
            <PencilIcon />
          </Link>
        </Button>
      </label>
      <label className={styles.item}>
        <Text>{t('userSettings.password')}</Text>
        <div className={styles.btns}>
          <Button
            className={styles.editEmailBtn}
            asChild={true}
          >
            <Link to={routes.changePassword}>
              <span>
                {password
                  ? t('userSettings.changePassword')
                  : t('userSettings.addPassowrd')}
              </span>
              <PencilIcon />
            </Link>
          </Button>
          {password && (
            <Button
              className={styles.editEmailBtn}
              color='danger'
            >
              <span>{t('userSettings.deletePassword')}</span>
              <TrashIcon />
            </Button>
          )}
        </div>
      </label>
    </div>
  )
}
