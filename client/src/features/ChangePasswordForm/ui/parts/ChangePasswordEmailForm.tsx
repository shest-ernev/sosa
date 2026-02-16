import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router'

import { Input, Text, Button } from '@/shared/ui'
import { useStore, useQS } from '@/shared/hooks'
import { useGetUserQuery } from '@/shared/api'
import { getTranslate } from '@/shared/lib'
import { routes } from '@/shared/config'
import { useChangePasswordEmailMutation } from '@/shared/api'
import EmailIcon from '@/shared/assets/svg/email.svg?react'

import { changePasswordFormFields } from '../../config'
import { ChangePasswordFormQS } from '../../types'
import { useChangePasswordFormContext } from '../../hooks'
import styles from '../../styles/index.module.scss'

export const ChangePasswordEmailForm = observer(() => {
  const { t } = useTranslation()
  const { auth, toast } = useStore()
  const { append } = useQS<ChangePasswordFormQS>()
  const { control, handleSubmit, reset } = useChangePasswordFormContext()

  const { data } = useGetUserQuery({
    enabled: auth.isAuth,
  })

  const { mutateAsync, isPending } = useChangePasswordEmailMutation({
    onError: (err) => {
      if (err.code) {
        toast.add({
          type: 'danger',
          text: t(
            getTranslate(`changePassword.emailErrors.${err.status}`),
            'Error',
          ),
        })
      }
    },
  })

  const submit = handleSubmit(async (v) => {
    try {
      const { email } = v

      if (!email) return

      const { data } = await mutateAsync({ email })

      append({
        step: '2',
        email: email,
        token: data.token,
      })
    } catch (err) {
      console.log(err)
    }
  })

  useEffect(() => {
    if (data?.data) {
      reset({ [changePasswordFormFields.email]: data.data.email })
    }
  }, [data])

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={submit}
      >
        <div className={styles.text}>
          <Text
            size='l'
            color='primary'
          >
            {t('changePassword.emailTitle')}
          </Text>
          <Text>{t('changePassword.emailDescription')}</Text>
        </div>
        <div className={styles.inputs}>
          <Controller
            name={changePasswordFormFields.email}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className={styles.inputContainer}>
                <Input.Root
                  className={styles.input}
                  error={!!error}
                  type='text'
                >
                  <EmailIcon className={styles.inputIcon} />
                  <Input.Value
                    placeholder={t('changePassword.emailPlaceholder')}
                    {...field}
                  />
                </Input.Root>
                {!!error?.message && (
                  <Text
                    size='s'
                    color='danger'
                  >
                    {t(getTranslate(error.message))}
                  </Text>
                )}
              </div>
            )}
          />
        </div>
        <Button
          color='primary'
          loading={isPending}
          className={styles.submitBtn}
        >
          {t('changePassword.send')}
        </Button>
      </form>
      <Text className={styles.question}>
        {t('changePassword.question')}{' '}
        <Link
          className='a'
          to={auth.isAuth ? routes.settings : routes.signIn}
        >
          {t('changePassword.back')}
        </Link>
      </Text>
    </div>
  )
})
