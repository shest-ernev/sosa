import { Controller } from 'react-hook-form'

import { SendCodeForm } from '@/shared/components'
import { routes } from '@/shared/config'
import { useQS } from '@/shared/hooks'

import { ChangePasswordFormQS } from '../../types'
import { changePasswordFormFields } from '../../config'
import { useChangePasswordFormContext } from '../../hooks'

export const ChangePaswordCodeForm = () => {
  const { searchParams, append } = useQS<ChangePasswordFormQS>()
  const { control, setValue, watch, handleSubmit } =
    useChangePasswordFormContext()

  const submit = handleSubmit(async () => {
    try {
      const { email, token } = searchParams

      if (!email || !token) return

      append({
        step: '3',
        email,
        token,
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
          onAgainSend={() => console.log('again')}
          loading={false}
        />
      )}
    />
  )
}
