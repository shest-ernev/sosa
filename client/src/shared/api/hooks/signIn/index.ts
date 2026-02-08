import { useMutation } from '@tanstack/react-query'

import { client } from '../../client'
import {
  signInCheckCodeKey,
  signInCheckPassKey,
  signInCreateTokenKey,
} from '../../keys'

import {
  UseSignInCreateTokenMutationOptions,
  UseSignInCheckCodeMutationOptions,
  UseSignInSendCodeMutationOptions,
  UseSignInCheckPassMutationOptions,
} from './types'

export const useSignInCreateTokenMutation = (
  options?: UseSignInCreateTokenMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/sign-in/create-token', data),
    mutationKey: [signInCreateTokenKey],
    ...options,
  })
}

export const useSignInCheckCodeMutation = (
  options?: UseSignInCheckCodeMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/sign-in/check-code', data),
    mutationKey: [signInCheckCodeKey],
    ...options,
  })
}

export const useSignInSendCodeMutation = (
  options?: UseSignInSendCodeMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/sign-in/send-code', data),
    mutationKey: [signInCheckCodeKey],
    ...options,
  })
}

export const useSignInCheckPassMutation = (
  options?: UseSignInCheckPassMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/sign-in/check-pass', data),
    mutationKey: [signInCheckPassKey],
    ...options,
  })
}
