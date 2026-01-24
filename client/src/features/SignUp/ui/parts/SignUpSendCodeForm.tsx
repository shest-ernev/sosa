import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Button, Code, Text } from '@/shared/ui'
import { routes } from '@/shared/config'

import styles from '../../styles/index.module.scss'

export const SignUpSendCode = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.text}>
          <Text
            color='primary'
            size='l'
          >
            {t('sendCode.title')}
          </Text>
          <Text>
            {t('sendCode.description', { email: 'shest_ernev@mail.ru' })}
          </Text>
        </div>
        <div className={styles.inputs}>
          <div className={styles.inputContainer}>
            <Code.Root className={styles.code}>
              {[...new Array(6)].map((_, index) => (
                <Code.Input
                  className={styles.codeInput}
                  key={index}
                />
              ))}
            </Code.Root>
          </div>
        </div>
        <Button
          className={styles.submitBtn}
          type='submit'
          color='primary'
        >
          {t('sendCode.submit')}
        </Button>
      </form>
      <Text className={styles.question}>
        {t('sendCode.question')}{' '}
        <Link
          className='a'
          to={routes.signUp}
        >
          {t('sendCode.questionLink')}
        </Link>
      </Text>
    </div>
  )
}
