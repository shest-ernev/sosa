import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'

import { useQS } from '@/shared/hooks'

import { useSignUpForm } from '../hooks'
import { SignUpFormQS } from '../types'
import { signUpFormFields } from '../config'

import { SignUpCreateTokenForm } from './parts/SignUpCreateTokenForm'
import { SignUpSendCodeForm } from './parts/SignUpSendCodeForm'

export const SignUpForm = () => {
  const { searchParams } = useQS<SignUpFormQS>()
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

  return (
    <FormProvider {...form}>
      {searchParams.token ? <SignUpSendCodeForm /> : <SignUpCreateTokenForm />}
    </FormProvider>
  )
}
