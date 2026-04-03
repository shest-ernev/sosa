import { useMutation } from '@tanstack/react-query'

import { client } from '../../client'
import { signUpCheckCodeKey, signUpCreateTokenKey } from '../../keys'

import {
  UseSignUpCreateTokenMutationOptions,
  UseSignUpCheckCodeMutationOptions,
  UseSignUpSendCodeMutationOptions,
} from './types'

export const useSignUpCreateTokenMutation = (
  options?: UseSignUpCreateTokenMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/sign-up/data', data),
    mutationKey: [signUpCreateTokenKey],
    ...options,
  })
}

export const useSignUpCheckCodeMutation = (
  options?: UseSignUpCheckCodeMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/sign-up/code', data),
    mutationKey: [signUpCheckCodeKey],
    ...options,
  })
}

export const useSignUpSendCodeMutation = (
  options?: UseSignUpSendCodeMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/sign-up/send-code', data),
    mutationKey: [signUpCheckCodeKey],
    ...options,
  })
}
