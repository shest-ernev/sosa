import { Controller } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import EmailIcon from '@/shared/assets/svg/email.svg?react'
import {
  getUserKey,
  queryClient,
  useChangeEmailNewMutation,
} from '@/shared/api'
import { routes } from '@/shared/config'
import { useQS, useStore } from '@/shared/hooks'
import { getTranslate } from '@/shared/lib'
import { Button, Input, Text } from '@/shared/ui'

import { changeEmailFormFields } from '../../config'
import { useChangeEmailFormContext } from '../../hooks'
import { ChangeEmailFormQS } from '../../types'
import styles from '../../styles/index.module.scss'

export const ChangeEmailNewEmailForm = observer(() => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { auth, toast } = useStore()
  const { searchParams } = useQS<ChangeEmailFormQS>()
  const { control, handleSubmit } = useChangeEmailFormContext()

  const { mutateAsync, isPending } = useChangeEmailNewMutation({
    onError: (err) => {
      if (err.status) {
        toast.add({
          type: 'danger',
          text: t(getTranslate(`changeEmail.newEmailErrors.${err.status}`), 'Error'),
        })
      }
    },
  })

  const submit = handleSubmit(async (v) => {
    try {
      const { token } = searchParams
      const { newEmail } = v

      if (!newEmail || !token) return

      await mutateAsync({
        email: newEmail,
        token,
      })

      if (auth.isAuth) {
        await queryClient.invalidateQueries({
          queryKey: [getUserKey],
        })

        navigate(routes.settings)
      } else {
        navigate(routes.signIn)
      }
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
            size='l'
            weight={700}
            color='primary'
          >
            {t('changeEmail.newEmail')}
          </Text>
          <Text>{t('changeEmail.newEmailDescription')}</Text>
        </div>
        <div className={styles.inputs}>
          <Controller
            name={changeEmailFormFields.newEmail}
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
                    placeholder={t('changeEmail.newEmailPlaceholder')}
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
          {t('changeEmail.newEmailBtn')}
        </Button>
      </form>
      <Text className={styles.question}>
        {t('changeEmail.newEmailQuestion')}
        <Link
          className='a'
          replace={true}
          to={routes.changeEmail}
        >
          {t('changeEmail.back')}
        </Link>
      </Text>
    </div>
  )
})
