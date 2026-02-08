import { useTranslation } from 'react-i18next'

import { Text, Button } from '@/shared/ui'
import PencilIcon from '@/shared/assets/svg/pencil.svg?react'

import styles from '../../styles/index.module.scss'

export const UserSettingsSecurity = () => {
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
        <Button className={styles.editEmailBtn}>
          <span>{t('userSettings.editEmail')}</span>
          <PencilIcon />
        </Button>
      </label>
    </div>
  )
}
