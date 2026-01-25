import { useForm, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { signUpFormDefault } from '../constants'
import { SignUpFormFields } from '../types'
import { signUpCreateTokenSchema, signUpSendCodeSchema } from '../lib'

export const useSignUpForm = (token?: string) => {
  const resolver = token ? signUpSendCodeSchema : signUpCreateTokenSchema

  return useForm<SignUpFormFields>({
    defaultValues: signUpFormDefault,
    mode: 'onSubmit',
    resolver: zodResolver(resolver),
  })
}

export const useSignUpFormContext = () => useFormContext<SignUpFormFields>()
