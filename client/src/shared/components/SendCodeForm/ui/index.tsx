import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import dayJs from 'dayjs'

import { Button, Code, Text } from '@/shared/ui'
import { useTimer } from '@/shared/hooks'

import { SendCodeFormProps } from '../types'
import styles from '../styles/index.module.scss'

export const SendCodeForm = ({
  value,
  backLink,
  email,
  error,
  loading,
  onChange,
  onSubmit,
  onAgainSend,
}: SendCodeFormProps) => {
  const { t } = useTranslation()
  const [timer, setTimer] = useTimer(60000)

  const handleAgainSend = () => {
    onAgainSend?.()
    setTimer(60000)
  }

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={onSubmit}
      >
        <div className={styles.text}>
          <Text
            color='primary'
            size='l'
          >
            {t('sendCode.title')}
          </Text>
          <Text>{t('sendCode.description', { email })}</Text>
        </div>
        <div className={styles.inputs}>
          <div className={styles.inputContainer}>
            <Code.Root
              className={styles.code}
              value={value}
              autoSubmit={true}
              onValueChange={onChange}
              disabled={loading}
              loading={loading}
              error={error}
            >
              {[...new Array(6)].map((_, index) => (
                <Code.Input
                  className={styles.codeInput}
                  key={index}
                />
              ))}
            </Code.Root>
          </div>
        </div>
        <div className={styles.tryContainer}>
          {timer !== 0 ? (
            <Text>
              {t('sendCode.again', {
                time: dayJs(0).millisecond(timer).format('mm:ss'),
              })}
            </Text>
          ) : (
            <Button
              className={styles.try}
              color='primary'
              type='button'
              onClick={handleAgainSend}
            >
              {t('sendCode.againBtn')}
            </Button>
          )}
        </div>
      </form>
      <Text className={styles.question}>
        {t('sendCode.question')}{' '}
        <Link
          replace={true}
          className='a'
          to={backLink}
        >
          {t('sendCode.questionLink')}
        </Link>
      </Text>
    </div>
  )
}
