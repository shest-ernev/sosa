import { Controller } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Button, Input, Text } from '@/shared/ui'
import { useStore } from '@/shared/hooks'
import { useQS } from '@/shared/hooks'
import { getTranslate } from '@/shared/lib'
import { useSignInCheckPassMutation } from '@/shared/api'
import { ls, routes } from '@/shared/config'

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

  const { mutateAsync, isPending } = useSignInCheckPassMutation({
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

      if (!v.password || !token) return

      const { data } = await mutateAsync({
        password: v.password,
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
    </div>
  )
}
