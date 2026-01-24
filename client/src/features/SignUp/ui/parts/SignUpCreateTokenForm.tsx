import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Text, Input, Button, Checkbox } from '@/shared/ui'
import { routes } from '@/shared/config'
import EmailIcon from '@/shared/assets/svg/email.svg?react'
import PeopleIcon from '@/shared/assets/svg/people.svg?react'

import styles from '../../styles/index.module.scss'

export const SignUpCreateTokenForm = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.text}>
          <Text
            color='primary'
            size='l'
          >
            {t('singUp.title')}
          </Text>
          <Text>{t('singUp.description')}</Text>
        </div>
        <div className={styles.inputs}>
          <div className={styles.inputContainer}>
            <Input.Provider type='text'>
              <Input.Label className={styles.input}>
                <PeopleIcon className={styles.inputIcon} />
                <Input.Text placeholder={t('singUp.nicknamePlaceholder')} />
              </Input.Label>
            </Input.Provider>
            {/*<Text
              color='danger'
              size='s'
            >
              Syka blyat ebal v rot
            </Text>*/}
          </div>
          <div className={styles.inputContainer}>
            <Input.Provider type='text'>
              <Input.Label className={styles.input}>
                <EmailIcon className={styles.inputIcon} />
                <Input.Text placeholder={t('singUp.emailPlaceholder')} />
              </Input.Label>
            </Input.Provider>
          </div>
          <label className={styles.agree}>
            <Checkbox />
            <Text className={styles.agreeText}>{t('singUp.agree')}</Text>
          </label>
        </div>
        <Button
          type='submit'
          color='primary'
          className={styles.submitBtn}
        >
          {t('singUp.submit')}
        </Button>
      </form>
      <Text
        size='m'
        className={styles.question}
      >
        {t('singUp.question')}{' '}
        <Link
          to={routes.signIn}
          className='a'
        >
          {t('signIn.title')}
        </Link>
      </Text>
    </div>
  )
}
