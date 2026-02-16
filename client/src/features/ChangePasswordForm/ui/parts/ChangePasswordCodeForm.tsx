import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { SendCodeForm } from '@/shared/components'
import {
  useChangePasswordCodeMutation,
  useChangePasswordSendCodeMutation,
} from '@/shared/api'
import { routes } from '@/shared/config'
import { useQS, useStore } from '@/shared/hooks'
import { getTranslate } from '@/shared/lib'

import { ChangePasswordFormQS } from '../../types'
import { changePasswordFormFields } from '../../config'
import { useChangePasswordFormContext } from '../../hooks'

export const ChangePaswordCodeForm = () => {
  const { searchParams, append } = useQS<ChangePasswordFormQS>()
  const { t } = useTranslation()
  const { toast } = useStore()
  const { control, setValue, watch, handleSubmit } =
    useChangePasswordFormContext()

  const { mutateAsync: checkCodeAsync, isPending: isCheckCodePending } =
    useChangePasswordCodeMutation({
      onError: (err) => {
        if (err.status) {
          toast.add({
            type: 'danger',
            text: t(getTranslate(`sendCode.errors.${err.status}`)),
          })
        }
      },
    })

  const { mutateAsync: sendCodeAsync } = useChangePasswordSendCodeMutation({
    onError: (err) => {
      if (err.status) {
        toast.add({
          type: 'danger',
          text: t(getTranslate(`sendCode.errors.${err.status}`)),
        })
      }
    },
  })

  const handleSendCodeAgain = async () => {
    try {
      const { token } = searchParams

      if (!token) return

      await sendCodeAsync({ token })
    } catch (err) {
      console.log(err)
    }
  }

  const submit = handleSubmit(async (v) => {
    try {
      const { code } = v
      const { token, email } = searchParams

      if (!token || !code || !email) return

      const { data } = await checkCodeAsync({ token, code })

      append({
        step: '3',
        email,
        token: data.token,
      })
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <Controller
      name={changePasswordFormFields.code}
      control={control}
      render={({ field: { value }, fieldState: { error } }) => (
        <SendCodeForm
          backLink={routes.changePassword}
          value={value}
          onSubmit={submit}
          email={watch(changePasswordFormFields.email)}
          onChange={(v) => setValue(changePasswordFormFields.code, v)}
          error={!!error}
          onAgainSend={handleSendCodeAgain}
          loading={isCheckCodePending}
        />
      )}
    />
  )
}
