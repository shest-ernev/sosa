import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  useChangeEmailCodeMutation,
  useChangeEmailSendCodeMutation,
} from '@/shared/api'
import { SendCodeForm } from '@/shared/components'
import { routes } from '@/shared/config'
import { useQS, useStore } from '@/shared/hooks'
import { getTranslate } from '@/shared/lib'

import { changeEmailFormFields } from '../../config'
import { useChangeEmailFormContext } from '../../hooks'
import { ChangeEmailFormQS } from '../../types'

export const ChangeEmailCodeForm = () => {
  const { searchParams, append } = useQS<ChangeEmailFormQS>()
  const { t } = useTranslation()
  const { toast } = useStore()
  const { control, handleSubmit, setValue, watch } = useChangeEmailFormContext()

  const { mutateAsync: checkCodeAsync, isPending: isCheckCodePending } =
    useChangeEmailCodeMutation({
      onError: (err) => {
        if (err.status) {
          toast.add({
            type: 'danger',
            text: t(getTranslate(`sendCode.errors.${err.status}`)),
          })
        }
      },
    })

  const { mutateAsync: sendCodeAsync } = useChangeEmailSendCodeMutation({
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

      if (!code || !email || !token) return

      const { data } = await checkCodeAsync({ code, token })

      append({
        email,
        step: '3',
        token: data.token,
      })
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <Controller
      name={changeEmailFormFields.code}
      control={control}
      render={({ field: { value }, fieldState: { error } }) => (
        <SendCodeForm
          backLink={routes.changeEmail}
          email={watch(changeEmailFormFields.email)}
          error={!!error}
          loading={isCheckCodePending}
          onAgainSend={handleSendCodeAgain}
          onChange={(v) => setValue(changeEmailFormFields.code, v)}
          onSubmit={submit}
          value={value}
        />
      )}
    />
  )
}
