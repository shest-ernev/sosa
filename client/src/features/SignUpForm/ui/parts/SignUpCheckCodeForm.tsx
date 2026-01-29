import { Controller } from 'react-hook-form'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

import { routes, ls } from '@/shared/config'
import { getTranslate } from '@/shared/lib'
import { SendCodeForm } from '@/shared/components'
import { useStore } from '@/shared/hooks'
import { useQS } from '@/shared/hooks'
import {
  useSignUpCheckCodeMutation,
  useSignUpSendCodeMutation,
} from '@/shared/api'

import { useSignUpFormContext } from '../../hooks'
import { signUpFormFields } from '../../config'
import { SignUpFormQS } from '../../types'

export const SignUpCheckCodeForm = observer(() => {
  const navigate = useNavigate()
  const { searchParams } = useQS<SignUpFormQS>()
  const { t } = useTranslation()
  const { control, reset, handleSubmit } = useSignUpFormContext()
  const { auth, toast } = useStore()

  const { mutateAsync: checkCodeMutation, isPending: isCheckCodePending } =
    useSignUpCheckCodeMutation({
      onError: (err) => {
        toast.add({
          type: 'danger',
          text: t(getTranslate(`sendCode.errors.${err.status}`), 'Error'),
        })
      },
    })

  const { mutateAsync: sendCodeAsync } = useSignUpSendCodeMutation()

  const handleSendCodeAgain = async () => {
    try {
      if (!searchParams.token) return

      await sendCodeAsync({ token: searchParams.token })
    } catch (err) {
      console.log(err)
    }
  }

  const submit = handleSubmit(async (v) => {
    try {
      const code = v.code

      if (!code || !searchParams.token) return

      const { data } = await checkCodeMutation({
        code,
        token: searchParams.token,
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
    <Controller
      control={control}
      name={signUpFormFields.code}
      render={({ field: { value }, fieldState: { error } }) => (
        <SendCodeForm
          backLink={routes.signUp}
          onSubmit={submit}
          loading={isCheckCodePending}
          email={searchParams.email}
          onAgainSend={handleSendCodeAgain}
          value={value}
          error={!!error}
          onChange={(v) => reset({ [signUpFormFields.code]: v })}
        />
      )}
    />
  )
})
