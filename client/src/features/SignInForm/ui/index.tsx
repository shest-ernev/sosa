import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router'

import { routes } from '@/shared/config'
import { useQS, useStore } from '@/shared/hooks'

import { useSignInForm } from '../hooks'
import { SignInFormQS } from '../types'
import { signInFormFields } from '../config'
import styles from '../styles/index.module.scss'

import { SignInEmailForm } from './parts/SignInEmailForm'
import { SignInCodeForm } from './parts/SignInCodeForm'
import { SignInPassForm } from './parts/SignInPassForm'

export const SignInForm = observer(() => {
  const { searchParams } = useQS<SignInFormQS>()
  const { auth } = useStore()
  const form = useSignInForm(searchParams.step)

  const { reset } = form

  const Content = {
    1: SignInEmailForm,
    2: SignInCodeForm,
    3: SignInPassForm,
  }[searchParams.step || '1']

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
      <div className={styles.content}>
        <Content />
      </div>
    </FormProvider>
  )
})
