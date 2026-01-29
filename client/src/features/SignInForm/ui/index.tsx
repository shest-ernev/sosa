import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router'

import { routes } from '@/shared/config'
import { useQS, useStore } from '@/shared/hooks'

import { useSignInForm } from '../hooks'
import { SignInFormQS } from '../types'
import { signInFormFields } from '../config'

import { SignInCreateTokenForm } from './parts/SignInCreateTokenForm'
import { SignInCheckCodeForm } from './parts/SignInCheckCodeForm'

export const SignInForm = observer(() => {
  const { searchParams } = useQS<SignInFormQS>()
  const { auth } = useStore()
  const form = useSignInForm(searchParams.token)

  const { reset } = form

  useEffect(() => {
    if (searchParams.email) {
      reset({ [signInFormFields.email]: searchParams.email })
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
      {searchParams.token ? <SignInCheckCodeForm /> : <SignInCreateTokenForm />}
    </FormProvider>
  )
})
