import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Text, Input, Button, Checkbox } from '@/shared/ui'
import { useQS } from '@/shared/hooks'
import { getFormError } from '@/shared/lib'
import { routes } from '@/shared/config'
import EmailIcon from '@/shared/assets/svg/email.svg?react'
import PeopleIcon from '@/shared/assets/svg/people.svg?react'

import { SignUpFormQS } from '../../types'
import { signUpFormFields } from '../../config'
import { useSignUpFormContext } from '../../hooks'
import styles from '../../styles/index.module.scss'

export const SignUpCreateTokenForm = () => {
  const { t } = useTranslation()
  const { control, handleSubmit } = useSignUpFormContext()
  const { append } = useQS<SignUpFormQS>()

  const submit = handleSubmit((v) => {
    append({
      token: 'token',
      name: v[signUpFormFields.name],
      email: v[signUpFormFields.email],
    })
  })

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={submit}
      >
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
          <Controller
            control={control}
            name={signUpFormFields.name}
            render={({ field, fieldState: { error } }) => (
              <div className={styles.inputContainer}>
                <Input.Provider
                  type='text'
                  error={!!error}
                >
                  <Input.Label className={styles.input}>
                    <PeopleIcon className={styles.inputIcon} />
                    <Input.Text
                      maxLength={300}
                      placeholder={t('singUp.nicknamePlaceholder')}
                      {...field}
                    />
                  </Input.Label>
                </Input.Provider>
                {error?.message && (
                  <Text
                    color='danger'
                    size='s'
                  >
                    {t(getFormError(error.message))}
                  </Text>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name={signUpFormFields.email}
            render={({ field, fieldState: { error } }) => (
              <div className={styles.inputContainer}>
                <Input.Provider
                  type='text'
                  error={!!error}
                >
                  <Input.Label className={styles.input}>
                    <EmailIcon className={styles.inputIcon} />
                    <Input.Text
                      placeholder={t('singUp.emailPlaceholder')}
                      {...field}
                    />
                  </Input.Label>
                </Input.Provider>
                {error?.message && (
                  <Text
                    color='danger'
                    size='s'
                  >
                    {t(getFormError(error.message))}
                  </Text>
                )}
              </div>
            )}
          />
          <label className={styles.agree}>
            <Controller
              control={control}
              name={signUpFormFields.agree}
              render={({
                field: { value, ...field },
                fieldState: { error },
              }) => (
                <Checkbox
                  checked={value}
                  error={!!error}
                  {...field}
                />
              )}
            />
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
