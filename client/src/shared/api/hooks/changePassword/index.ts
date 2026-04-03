import { useMutation } from '@tanstack/react-query'

import { client } from '../../client'
import {
  changePasswordEmailKey,
  changePasswordCodeKey,
  changePasswordNewKey,
  changePasswordSendCodeKey,
} from '../../keys'

import {
  UseChangePasswordEmailMutationOptions,
  UseChangePasswordCodeMutationOptions,
  UseChangePasswordNewMutationOptions,
  UseChangePasswordSendCodeMutationOptions,
} from './types'

export const useChangePasswordEmailMutation = (
  options?: UseChangePasswordEmailMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/change-password/email', data),
    mutationKey: [changePasswordEmailKey],
    ...options,
  })
}

export const useChangePasswordCodeMutation = (
  options?: UseChangePasswordCodeMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/change-password/code', data),
    mutationKey: [changePasswordCodeKey],
    ...options,
  })
}

export const useChangePasswordNewMutation = (
  options?: UseChangePasswordNewMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.patch('/change-password/password', data),
    mutationKey: [changePasswordNewKey],
    ...options,
  })
}

export const useChangePasswordSendCodeMutation = (
  options?: UseChangePasswordSendCodeMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/change-password/send-code', data),
    mutationKey: [changePasswordSendCodeKey],
    ...options,
  })
}
