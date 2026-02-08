import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Text, Input, Button, Checkbox } from '@/shared/ui'
import { useQS, useStore } from '@/shared/hooks'
import { getTranslate } from '@/shared/lib'
import { routes } from '@/shared/config'
import { useSignUpCreateTokenMutation } from '@/shared/api'
import EmailIcon from '@/shared/assets/svg/email.svg?react'
import PeopleIcon from '@/shared/assets/svg/people.svg?react'

import { SignUpFormQS } from '../../types'
import { signUpFormFields } from '../../config'
import { useSignUpFormContext } from '../../hooks'
import styles from '../../styles/index.module.scss'

export const SignUpCreateTokenForm = () => {
  const { t } = useTranslation()
  const { control, handleSubmit } = useSignUpFormContext()
  const { toast } = useStore()
  const { append } = useQS<SignUpFormQS>()

  const { mutateAsync, isPending } = useSignUpCreateTokenMutation({
    onError: (err) => {
      toast.add({
        type: 'danger',
        text: t(getTranslate(`singUp.errors.${err.status}`), 'Error'),
      })
    },
  })

  const submit = handleSubmit(async (v) => {
    try {
      const { name, email } = v

      if (!name || !email) {
        return
      }

      const { data } = await mutateAsync({ name, email })

      append({
        token: data.token,
        name,
        email,
      })
    } catch (err) {
      console.log(err)
    }
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
                <Input.Root
                  className={styles.input}
                  type='text'
                  error={!!error}
                >
                  <PeopleIcon className={styles.inputIcon} />
                  <Input.Value
                    maxLength={300}
                    placeholder={t('singUp.nicknamePlaceholder')}
                    {...field}
                  />
                </Input.Root>
                {error?.message && (
                  <Text
                    color='danger'
                    size='s'
                  >
                    {t(getTranslate(error.message))}
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
                <Input.Root
                  className={styles.input}
                  type='text'
                  error={!!error}
                >
                  <EmailIcon className={styles.inputIcon} />
                  <Input.Value
                    placeholder={t('singUp.emailPlaceholder')}
                    {...field}
                  />
                </Input.Root>
                {error?.message && (
                  <Text
                    color='danger'
                    size='s'
                  >
                    {t(getTranslate(error.message))}
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
          loading={isPending}
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
