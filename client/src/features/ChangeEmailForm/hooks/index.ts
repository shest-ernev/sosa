import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'

import { changeEmailFormDefault } from '../constants'
import { ChangeEmailFormFields } from '../types'
import {
  changeEmailCodeFormSchema,
  changeEmailEmailFormSchema,
  changeEmailNewEmailFormSchema,
} from '../validations'

export const useChangeEmailForm = (step?: '1' | '2' | '3') => {
  const resolver = {
    1: changeEmailEmailFormSchema,
    2: changeEmailCodeFormSchema,
    3: changeEmailNewEmailFormSchema,
  }[step || '1']

  return useForm<ChangeEmailFormFields>({
    defaultValues: changeEmailFormDefault,
    mode: 'onSubmit',
    resolver: zodResolver(resolver),
  })
}

export const useChangeEmailFormContext = () =>
  useFormContext<ChangeEmailFormFields>()
