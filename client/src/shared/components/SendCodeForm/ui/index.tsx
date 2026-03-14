import { ChangeEvent, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import dayJs from 'dayjs'

import { Button, Input, Text } from '@/shared/ui'
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
  const btnRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAgainSend = () => {
    onAgainSend?.()
    setTimer(60000)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value.replace(/\D/g, '')

    if (v.length >= 6) {
      onChange?.(v.slice(0, 6))
      btnRef.current?.click()
      return inputRef.current?.blur()
    }

    return onChange?.(v)
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
            <Input.Root
              className={styles.input}
              error={error}
              type='text'
            >
              <Input.Value
                placeholder={t('sendCode.placeholder')}
                value={value}
                onChange={handleChange}
                disabled={loading}
                ref={inputRef}
              />
            </Input.Root>
          </div>
        </div>
        <button
          ref={btnRef}
          type='submit'
          hidden={true}
        />
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
