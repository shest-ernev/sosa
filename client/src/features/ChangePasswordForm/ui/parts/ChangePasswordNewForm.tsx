import { Link } from 'react-router'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Input, Text, Button } from '@/shared/ui'
import { useQS } from '@/shared/hooks'
import { getTranslate } from '@/shared/lib'
import { routes } from '@/shared/config'

import { ChangePasswordFormQS } from '../../types'
import { changePasswordFormFields } from '../../config'
import { useChangePasswordFormContext } from '../../hooks'
import styles from '../../styles/index.module.scss'

export const ChangePasswordNewForm = () => {
  const { t } = useTranslation()
  const { searchParams } = useQS<ChangePasswordFormQS>()
  const { control, handleSubmit } = useChangePasswordFormContext()

  const submit = handleSubmit(async (v) => {
    try {
      const { token } = searchParams
      const { password } = v

      if (!password || !token) return

      console.log(password, token)
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
            {t('changePassword.password')}
          </Text>
          <Text>{t('changePassword.passwordDescription')}</Text>
        </div>
        <div className={styles.inputs}>
          <Controller
            name={changePasswordFormFields.password}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <div className={styles.inputContainer}>
                <Input.Root
                  className={styles.input}
                  type='password'
                  error={!!error}
                >
                  <Input.Value
                    placeholder={t('changePassword.passwordPlaceholder')}
                    {...field}
                  />
                  <Input.Toogle />
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
        >
          {t('changePassword.passwordBtn')}
        </Button>
      </form>
      <Text className={styles.question}>
        {t('changePassword.passwordQuestion')}
        <Link
          className='a'
          replace={true}
          to={routes.changePassword}
        >
          {t('changePassword.back')}
        </Link>
      </Text>
    </div>
  )
}
