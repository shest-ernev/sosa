import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'

import { useQS } from '@/shared/hooks'

import { ChangePasswordFormQS } from '../types'
import { useChangePasswordForm } from '../hooks'
import { changePasswordFormFields } from '../config'
import styles from '../styles/index.module.scss'

import { ChangePasswordEmailForm } from './parts/ChangePasswordEmailForm'
import { ChangePaswordCodeForm } from './parts/ChangePasswordCodeForm'
import { ChangePasswordNewForm } from './parts/ChangePasswordNewForm'

export const ChangePasswordForm = () => {
  const { searchParams } = useQS<ChangePasswordFormQS>()
  const form = useChangePasswordForm(searchParams.step)

  const { reset } = form

  const Content = {
    1: ChangePasswordEmailForm,
    2: ChangePaswordCodeForm,
    3: ChangePasswordNewForm,
  }[searchParams.step || '1']

  useEffect(() => {
    if (searchParams.email) {
      reset({ [changePasswordFormFields.email]: searchParams.email })
    }
  }, [])

  return (
    <FormProvider {...form}>
      <div className={styles.content}>
        <Content />
      </div>
    </FormProvider>
  )
}
