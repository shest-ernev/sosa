import { useForm, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { signInFormDefault } from '../constants'
import { SignInFormFields } from '../types'
import { signInCheckCodeSchema, signInCreateTokenSchema } from '../validation'

export const useSignInForm = (token?: string) => {
  const resolver = token ? signInCheckCodeSchema : signInCreateTokenSchema

  return useForm<SignInFormFields>({
    defaultValues: signInFormDefault,
    mode: 'onSubmit',
    resolver: zodResolver(resolver),
  })
}

export const useSignInFormContext = () => useFormContext<SignInFormFields>()
