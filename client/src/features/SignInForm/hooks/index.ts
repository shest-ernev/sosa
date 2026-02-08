import { useForm, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { signInFormDefault } from '../constants'
import { SignInFormFields } from '../types'
import {
  signInCheckCodeSchema,
  signInCreateTokenSchema,
  signInCheckPassSchema,
} from '../validation'

export const useSignInForm = (step?: '1' | '2' | '3') => {
  const resolver = {
    1: signInCreateTokenSchema,
    2: signInCheckCodeSchema,
    3: signInCheckPassSchema,
  }[step || '1']

  return useForm<SignInFormFields>({
    defaultValues: signInFormDefault,
    mode: 'onSubmit',
    resolver: zodResolver(resolver),
  })
}

export const useSignInFormContext = () => useFormContext<SignInFormFields>()
