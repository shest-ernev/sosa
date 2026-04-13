import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'

import { useQS } from '@/shared/hooks'

import { changeEmailFormFields } from '../config'
import { useChangeEmailForm } from '../hooks'
import { ChangeEmailFormQS } from '../types'
import styles from '../styles/index.module.scss'

import { ChangeEmailCodeForm } from './parts/ChangeEmailCodeForm'
import { ChangeEmailEmailForm } from './parts/ChangeEmailEmailForm'
import { ChangeEmailNewEmailForm } from './parts/ChangeEmailNewEmailForm'

export const ChangeEmailForm = () => {
  const { searchParams } = useQS<ChangeEmailFormQS>()
  const form = useChangeEmailForm(searchParams.step)

  const { reset } = form

  const Content = {
    1: ChangeEmailEmailForm,
    2: ChangeEmailCodeForm,
    3: ChangeEmailNewEmailForm,
  }[searchParams.step || '1']

  useEffect(() => {
    if (searchParams.email) {
      reset({ [changeEmailFormFields.email]: searchParams.email })
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
