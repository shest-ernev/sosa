import { Controller } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Button, Input, Text } from '@/shared/ui'
import { useStore } from '@/shared/hooks'
import { useQS } from '@/shared/hooks'
import { getTranslate } from '@/shared/lib'
import { useSignInPasswordMutation } from '@/shared/api'
import { ls, routes } from '@/shared/config'
import PasswordIcon from '@/shared/assets/svg/password.svg?react'

import { SignInFormQS } from '../../types'
import { useSignInFormContext } from '../../hooks'
import { signInFormFields } from '../../config'
import styles from '../../styles/index.module.scss'

export const SignInPassForm = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { searchParams } = useQS<SignInFormQS>()
  const { toast, auth } = useStore()
  const { control, handleSubmit } = useSignInFormContext()

  const { mutateAsync, isPending } = useSignInPasswordMutation({
    onError: () => {
      toast.add({
        type: 'danger',
        text: t('signIn.errors.password'),
      })
    },
  })

  const submit = handleSubmit(async (v) => {
    try {
      const { token } = searchParams
      const { password } = v

      if (!password || !token) return

      const { data } = await mutateAsync({
        password,
        token,
      })

      localStorage.setItem(ls.accessToken, data.access_token)
      localStorage.setItem(ls.refreshToken, data.refresh_token)

      auth.setIsAuth(true)

      navigate(routes.profile)
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
            {t('signIn.password')}
          </Text>
          <Text>{t('signIn.passwordDescription')}</Text>
        </div>
        <div className={styles.inputs}>
          <Controller
            control={control}
            name={signInFormFields.password}
            render={({ field, fieldState: { error } }) => (
              <div className={styles.inputContainer}>
                <Input.Root
                  className={styles.input}
                  type='password'
                  error={!!error}
                >
                  <PasswordIcon className={styles.inputIcon} />
                  <Input.Value
                    placeholder={t('signIn.passwordPlaceholder')}
                    {...field}
                  />
                  <Input.Toogle />
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
      <div className={styles.buttomForm}>
        <Text className={styles.question}>
          {t('sendCode.question')}{' '}
          <Link
            replace={true}
            className='a'
            to={routes.signIn}
          >
            {t('sendCode.questionLink')}
          </Link>
        </Text>
        <Text className={styles.question}>
          <Link
            className='a'
            to={routes.changePassword}
          >
            {t('signIn.passwordQuestion')}
          </Link>
        </Text>
      </div>
    </div>
  )
}
