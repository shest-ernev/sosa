import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Text, Input, Button } from '@/shared/ui'
import { getTranslate } from '@/shared/lib'
import { routes } from '@/shared/config'
import { useQS, useStore } from '@/shared/hooks'
import { useSignInEmailMutation } from '@/shared/api'
import EmailIcon from '@/shared/assets/svg/email.svg?react'

import { signInFormFields } from '../../config'
import { useSignInFormContext } from '../../hooks'
import { SignInFormQS } from '../../types'
import styles from '../../styles/index.module.scss'

export const SignInEmailForm = () => {
  const { t } = useTranslation()
  const { append } = useQS<SignInFormQS>()
  const { toast } = useStore()
  const { handleSubmit, control } = useSignInFormContext()

  const { mutateAsync, isPending } = useSignInEmailMutation({
    onError: (err) => {
      toast.add({
        type: 'danger',
        text: t(getTranslate(`signIn.errors.${err.status}`), 'Error'),
      })
    },
  })

  const submit = handleSubmit(async (v) => {
    try {
      const { email } = v

      if (!email) return

      const { data } = await mutateAsync({ email })

      append({
        step: '2',
        email,
        token: data.token,
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
            {t('signIn.title')}
          </Text>
          <Text>{t('signIn.description')}</Text>
        </div>
        <div className={styles.inputs}>
          <Controller
            control={control}
            name={signInFormFields.email}
            render={({ field, fieldState: { error } }) => (
              <div className={styles.inputContainer}>
                <Input.Root
                  className={styles.input}
                  type='text'
                  error={!!error}
                >
                  <EmailIcon className={styles.inputIcon} />
                  <Input.Value
                    placeholder={t('signIn.emailPlaceholder')}
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
        </div>
        <Button
          type='submit'
          color='primary'
          loading={isPending}
          className={styles.submitBtn}
        >
          {t('signIn.title')}
        </Button>
      </form>
      <Text
        size='m'
        className={styles.question}
      >
        {t('signIn.question')}{' '}
        <Link
          to={routes.signUp}
          className='a'
        >
          {t('singUp.title')}
        </Link>
      </Text>
    </div>
  )
}
