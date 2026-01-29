import { useMutation } from '@tanstack/react-query'

import { api } from '../../lib'
import { signInCheckCodeKey, signInCreateTokenKey } from '../../keys'

import {
  UseSignInCreateTokenMutationOptions,
  UseSignInCheckCodeMutationOptions,
  UseSignInSendCodeMutationOptions,
} from './types'

export const useSignInCreateTokenMutation = (
  options?: UseSignInCreateTokenMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => api.post('/sign-in/create-token', data),
    mutationKey: [signInCreateTokenKey],
    ...options,
  })
}

export const useSignInCheckCodeMutation = (
  options?: UseSignInCheckCodeMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => api.post('/sign-in/check-code', data),
    mutationKey: [signInCheckCodeKey],
    ...options,
  })
}

export const useSignInSendCodeMutation = (
  options?: UseSignInSendCodeMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => api.post('/sign-in/send-code', data),
    mutationKey: [signInCheckCodeKey],
    ...options,
  })
}
