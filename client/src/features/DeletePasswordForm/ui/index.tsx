import { observer } from 'mobx-react-lite'
import { Navigate, useNavigate } from 'react-router'
import { Controller, FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useStore, useQS } from '@/shared/hooks'
import { SendCodeForm } from '@/shared/components'
import { routes } from '@/shared/config'
import { getTranslate } from '@/shared/lib'
import {
  getUserKey,
  queryClient,
  useDeletePasswordCheckCodeMutation,
  useDeletePasswordSendCodeMutation,
} from '@/shared/api'

import { DeletePasswordFormQS } from '../types'
import { deletePasswordFormFields } from '../config'
import { useDeletePasswordForm } from '../hooks'
import styles from '../styles/index.module.scss'

export const DeletePasswordForm = observer(() => {
  const { auth, toast } = useStore()
  const { searchParams } = useQS<DeletePasswordFormQS>()
  const { t } = useTranslation()
  const form = useDeletePasswordForm()
  const navigate = useNavigate()

  const { control, setValue, handleSubmit } = form

  const { mutateAsync: checkCodeAsync, isPending: isCheckCodePending } =
    useDeletePasswordCheckCodeMutation()

  const { mutateAsync: sendCodeAsync } = useDeletePasswordSendCodeMutation({
    onError: (err) => {
      toast.add({
        type: 'danger',
        text: t(getTranslate(`sendCode.errors.${err.status}`), 'Error'),
      })
    },
  })

  const submit = handleSubmit(async ({ code }) => {
    try {
      if (!searchParams.token) return

      await checkCodeAsync({
        code,
        token: searchParams.token,
      })

      await queryClient.invalidateQueries({
        queryKey: [getUserKey],
      })

      navigate(routes.settings)
    } catch (err) {
      console.log(err)
    }
  })

  const handleSendCodeAgain = async () => {
    try {
      if (!searchParams.token) return

      await sendCodeAsync({ token: searchParams.token })
    } catch (err) {
      console.log(err)
    }
  }

  if (!auth.isAuth) {
    return (
      <Navigate
        to={routes.home}
        replace={true}
      />
    )
  }

  return (
    <FormProvider {...form}>
      <div className={styles.content}>
        <Controller
          name={deletePasswordFormFields.code}
          control={control}
          render={({ field: { value }, fieldState: { error } }) => (
            <SendCodeForm
              backLink={routes.settings}
              value={value}
              email={searchParams.email}
              error={!!error}
              loading={isCheckCodePending}
              onSubmit={submit}
              onAgainSend={handleSendCodeAgain}
              onChange={(v) => setValue(deletePasswordFormFields.code, v)}
            />
          )}
        />
      </div>
    </FormProvider>
  )
})
