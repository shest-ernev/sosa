import { useMutation } from '@tanstack/react-query'

import { components } from '@/shared/types'

import { client } from '../../client'
import {
  deletePasswordCodeKey,
  deletePasswordCreateKey,
  deletePasswordSendCodeKey,
} from '../../keys'

import {
  UseDeletePasswordCheckCodeMutationOptions,
  UseDeletePasswordCreateMutationOptions,
  UseDeletePasswordSendCodeMutationOptions,
} from './types'

export const useDeletePasswordCreateMutation = (
  options?: UseDeletePasswordCreateMutationOptions,
) => {
  return useMutation({
    mutationFn: () =>
      client.post<components['schemas']['DeletePasswordCreateData']>(
        '/delete-password',
      ),
    mutationKey: [deletePasswordCreateKey],
    ...options,
  })
}

export const useDeletePasswordSendCodeMutation = (
  options?: UseDeletePasswordSendCodeMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/delete-password/send-code', data),
    mutationKey: [deletePasswordSendCodeKey],
    ...options,
  })
}

export const useDeletePasswordCheckCodeMutation = (
  options?: UseDeletePasswordCheckCodeMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.post('/delete-password/code', data),
    mutationKey: [deletePasswordCodeKey],
    ...options,
  })
}
