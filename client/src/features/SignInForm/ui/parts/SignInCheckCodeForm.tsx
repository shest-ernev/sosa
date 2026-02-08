import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { observer } from 'mobx-react-lite'

import { useQS } from '@/shared/hooks'
import { getTranslate } from '@/shared/lib'
import {
  useSignInSendCodeMutation,
  useSignInCheckCodeMutation,
} from '@/shared/api'
import { routes, ls } from '@/shared/config'
import { useStore } from '@/shared/hooks'
import { SendCodeForm } from '@/shared/components'

import { useSignInFormContext } from '../../hooks'
import { signInFormFields } from '../../config'
import { SignInFormQS } from '../../types'

export const SignInCheckCodeForm = observer(() => {
  const navigate = useNavigate()
  const { searchParams, set } = useQS<SignInFormQS>()
  const { t } = useTranslation()
  const { control, reset, handleSubmit } = useSignInFormContext()
  const { auth, toast } = useStore()

  const { mutateAsync: checkCodeMutation, isPending: isCheckCodePending } =
    useSignInCheckCodeMutation({
      onError: (err) => {
        toast.add({
          type: 'danger',
          text: t(getTranslate(`sendCode.errors.${err.status}`), 'Error'),
        })
      },
    })

  const { mutateAsync: sendCodeAsync } = useSignInSendCodeMutation()

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

      if (data.password) {
        return set({
          step: '3',
          token: data.password,
        })
      }

      if (data.access_token && data.refresh_token) {
        localStorage.setItem(ls.accessToken, data.access_token)
        localStorage.setItem(ls.refreshToken, data.refresh_token)

        auth.setIsAuth(true)

        navigate(routes.profile)
      }
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <Controller
      control={control}
      name={signInFormFields.code}
      render={({ field: { value }, fieldState: { error } }) => (
        <SendCodeForm
          backLink={routes.signIn}
          onSubmit={submit}
          loading={isCheckCodePending}
          email={searchParams.email}
          onAgainSend={handleSendCodeAgain}
          value={value}
          error={!!error}
          onChange={(v) => reset({ [signInFormFields.code]: v })}
        />
      )}
    />
  )
})
