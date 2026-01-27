import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { useStore } from '@/shared/hooks'
import { getTranslate } from '@/shared/lib'

import { api } from '../../lib'
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
    mutationFn: (data) => api.post('/sign-up/create-token', data),
    mutationKey: [signUpCreateTokenKey],
    ...options,
  })
}

export const useSignUpCheckCodeMutation = (
  options?: UseSignUpCheckCodeMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => api.post('/sign-up/check-code', data),
    mutationKey: [signUpCheckCodeKey],
    ...options,
  })
}

export const useSignUpSendCodeMutation = (
  options?: UseSignUpSendCodeMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => api.post('/sign-up/send-code', data),
    mutationKey: [signUpCheckCodeKey],
    ...options,
  })
}
