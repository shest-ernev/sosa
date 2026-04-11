import { useTranslation } from 'react-i18next'

import { Text } from '@/shared/ui'

import { privacyPolicySections } from '../../constants'
import styles from '../../styles/index.module.scss'

export const PrivacyPolicyContent = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.content}>
      <Text
        tag='h1'
        size='xl'
        color='primary'
        weight={700}
      >
        {t('privacyPolicy.title')}
      </Text>
      <Text>{t('privacyPolicy.description')}</Text>
      {privacyPolicySections.map((obj) => (
        <section
          key={obj.title}
          className={styles.section}
        >
          <Text
            tag='h2'
            color='primary'
            size='l'
            weight={700}
          >
            {t(obj.title)}
          </Text>
          <Text>{t(obj.text)}</Text>
        </section>
      ))}
    </div>
  )
}
