import { useMutation } from '@tanstack/react-query'

import { client } from '../../client'
import {
  signInCodeKey,
  signInPasswordKey,
  signInEmailKey,
  signInSendCodeKey,
} from '../../keys'

import {
  UseSignInEmailMutationOptions,
  UseSignInCodeMutationOptions,
  UseSignInSendCodeMutationOptions,
  UseSignInPasswordMutationOptions,
} from './types'

export const useSignInEmailMutation = (
  options?: UseSignInEmailMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/sign-in/email', data),
    mutationKey: [signInEmailKey],
    ...options,
  })
}

export const useSignInCodeMutation = (
  options?: UseSignInCodeMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/sign-in/code', data),
    mutationKey: [signInCodeKey],
    ...options,
  })
}

export const useSignInSendCodeMutation = (
  options?: UseSignInSendCodeMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/sign-in/send-code', data),
    mutationKey: [signInSendCodeKey],
    ...options,
  })
}

export const useSignInPasswordMutation = (
  options?: UseSignInPasswordMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/sign-in/password', data),
    mutationKey: [signInPasswordKey],
    ...options,
  })
}
