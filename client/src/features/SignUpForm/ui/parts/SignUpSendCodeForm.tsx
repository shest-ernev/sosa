import { Navigate } from 'react-router'
import { Controller } from 'react-hook-form'

import { routes } from '@/shared/config'
import { SendCodeForm } from '@/shared/components'
import { useQS } from '@/shared/hooks'

import { useSignUpFormContext } from '../../hooks'
import { signUpFormFields } from '../../config'
import { SignUpFormQS } from '../../types'

export const SignUpSendCodeForm = () => {
  const { searchParams } = useQS<SignUpFormQS>()
  const { control, reset, handleSubmit } = useSignUpFormContext()

  const submit = handleSubmit((v) => console.log(v.code))

  if (!searchParams.email || !searchParams.token) {
    return (
      <Navigate
        to={routes.signUp}
        replace={true}
      />
    )
  }

  return (
    <Controller
      control={control}
      name={signUpFormFields.code}
      render={({ field: { value }, fieldState: { error } }) => (
        <SendCodeForm
          backLink={routes.signUp}
          onSubmit={submit}
          email={searchParams.email}
          value={value}
          error={!!error}
          onChange={(v) => reset({ [signUpFormFields.code]: v })}
        />
      )}
    />
  )
}
