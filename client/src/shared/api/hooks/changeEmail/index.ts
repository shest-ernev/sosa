import { useMutation } from '@tanstack/react-query'

import { client } from '../../client'
import {
  changeEmailCodeKey,
  changeEmailEmailKey,
  changeEmailNewKey,
  changeEmailSendCodeKey,
} from '../../keys'

import {
  UseChangeEmailCodeMutationOptions,
  UseChangeEmailEmailMutationOptions,
  useChangeEmailNewMutationOptions,
  UseChangeEmailSendCodeMutationOptions,
} from './types'

export const useChangeEmailEmailMutation = (
  options?: UseChangeEmailEmailMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/change-email/email', data),
    mutationKey: [changeEmailEmailKey],
    ...options,
  })
}

export const useChangeEmailSendCodeMutation = (
  options?: UseChangeEmailSendCodeMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/change-email/send-code', data),
    mutationKey: [changeEmailSendCodeKey],
    ...options,
  })
}

export const useChangeEmailCodeMutation = (
  options?: UseChangeEmailCodeMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/change-email/code', data),
    mutationKey: [changeEmailCodeKey],
    ...options,
  })
}

export const useChangeEmailNewMutation = (
  options?: useChangeEmailNewMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.patch('/change-email/new-email', data),
    mutationKey: [changeEmailNewKey],
    ...options,
  })
}
