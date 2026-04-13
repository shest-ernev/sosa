import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { Link } from 'react-router'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import EmailIcon from '@/shared/assets/svg/email.svg?react'
import { useChangeEmailEmailMutation, useGetUserQuery } from '@/shared/api'
import { routes } from '@/shared/config'
import { useQS, useStore } from '@/shared/hooks'
import { getTranslate } from '@/shared/lib'
import { Button, Input, Text } from '@/shared/ui'

import { changeEmailFormFields } from '../../config'
import { useChangeEmailFormContext } from '../../hooks'
import { ChangeEmailFormQS } from '../../types'
import styles from '../../styles/index.module.scss'

export const ChangeEmailEmailForm = observer(() => {
  const { t } = useTranslation()
  const { auth, toast } = useStore()
  const { append } = useQS<ChangeEmailFormQS>()
  const { control, handleSubmit, reset } = useChangeEmailFormContext()

  const { data } = useGetUserQuery({
    enabled: auth.isAuth,
  })

  const { mutateAsync, isPending } = useChangeEmailEmailMutation({
    onError: (err) => {
      if (err.code) {
        toast.add({
          type: 'danger',
          text: t(getTranslate(`changeEmail.emailErrors.${err.status}`), 'Error'),
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
        email,
        step: '2',
        token: data.token,
      })
    } catch (err) {
      console.log(err)
    }
  })

  useEffect(() => {
    if (data?.data) {
      reset({ [changeEmailFormFields.email]: data.data.email })
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
            {t('changeEmail.emailTitle')}
          </Text>
          <Text>{t('changeEmail.emailDescription')}</Text>
        </div>
        <div className={styles.inputs}>
          <Controller
            name={changeEmailFormFields.email}
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
                    placeholder={t('changeEmail.emailPlaceholder')}
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
          className={styles.submitBtn}
          color='primary'
          loading={isPending}
        >
          {t('changeEmail.send')}
        </Button>
      </form>
      <Text className={styles.question}>
        {t('changeEmail.question')}
        <Link
          className='a'
          to={auth.isAuth ? routes.settings : routes.signIn}
        >
          {t('changeEmail.back')}
        </Link>
      </Text>
    </div>
  )
})
