import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import { Navigate } from 'react-router'
import { observer } from 'mobx-react-lite'

import { useQS, useStore } from '@/shared/hooks'
import { routes } from '@/shared/config'

import { useSignUpForm } from '../hooks'
import { SignUpFormQS } from '../types'
import { signUpFormFields } from '../config'

import { SignUpCreateTokenForm } from './parts/SignUpCreateTokenForm'
import { SignUpSendCodeForm } from './parts/SignUpSendCodeForm'

export const SignUpForm = observer(() => {
  const { searchParams } = useQS<SignUpFormQS>()
  const { auth } = useStore()
  const form = useSignUpForm(searchParams.token)

  const { reset } = form

  useEffect(() => {
    if (searchParams.name && searchParams.email) {
      reset({
        [signUpFormFields.name]: searchParams.name,
        [signUpFormFields.email]: searchParams.email,
        [signUpFormFields.agree]: true,
      })
    }
  }, [])

  if (auth.isAuth) {
    return (
      <Navigate
        to={routes.profile}
        replace={true}
      />
    )
  }

  return (
    <FormProvider {...form}>
      {searchParams.token ? <SignUpSendCodeForm /> : <SignUpCreateTokenForm />}
    </FormProvider>
  )
})
