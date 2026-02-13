import { useForm, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ChangePasswordFormFields } from '../types'
import { changePasswordFormDeafult } from '../constants'
import {
  changePasswordCodeFormSchema,
  changePasswordEmailFormSchema,
  changePasswordNewFormSchema,
} from '../validations'

export const useChangePasswordForm = (step?: '1' | '2' | '3') => {
  const resolver = {
    1: changePasswordEmailFormSchema,
    2: changePasswordCodeFormSchema,
    3: changePasswordNewFormSchema,
  }[step || 1]

  return useForm<ChangePasswordFormFields>({
    defaultValues: changePasswordFormDeafult,
    mode: 'onSubmit',
    resolver: zodResolver(resolver),
  })
}

export const useChangePasswordFormContext = () =>
  useFormContext<ChangePasswordFormFields>()
