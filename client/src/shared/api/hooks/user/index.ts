import { useMutation, useQuery } from '@tanstack/react-query'

import { client } from '../../client'
import {
  deleteUserAvatarKey,
  deleteUserCoverKey,
  editUserAvatarKey,
  editUserCoverKey,
  editUserDescriptionKey,
  editUserNameKey,
  getUserKey,
} from '../../keys'

import {
  UseDeleteUserAvatarMutationOptions,
  UseDeleteUserCoverMutationOptions,
  UseEditUserAvatarMutationOptions,
  UseEditUserCoverMutationOptions,
  UseEditUserDescriptionMutationOptions,
  UseEditUserNameMutationOptions,
  UseGetUserQueryOptions,
} from './types'

export const useGetUserQuery = (options?: UseGetUserQueryOptions) => {
  return useQuery({
    queryFn: () => client.get('/user'),
    queryKey: [getUserKey],
    ...options,
  })
}

export const useEditUserNameMutation = (
  options?: UseEditUserNameMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.patch('/user/name', data),
    mutationKey: [editUserNameKey],
    ...options,
  })
}

export const useEditUserDescriptionMutation = (
  options?: UseEditUserDescriptionMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.patch('/user/description', data),
    mutationKey: [editUserDescriptionKey],
    ...options,
  })
}

export const useEditUserAvatarMutation = (
  options?: UseEditUserAvatarMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.patch('/user/avatar', data),
    mutationKey: [editUserAvatarKey],
    ...options,
  })
}

export const useDeleteUserAvatarMutation = (
  options?: UseDeleteUserAvatarMutationOptions,
) => {
  return useMutation({
    mutationFn: () => client.delete('/user/avatar'),
    mutationKey: [deleteUserAvatarKey],
    ...options,
  })
}

export const useEditUserCoverMutation = (
  options?: UseEditUserCoverMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.patch('/user/cover', data),
    mutationKey: [editUserCoverKey],
    ...options,
  })
}

export const useDeleteUserCoverMutation = (
  options?: UseDeleteUserCoverMutationOptions,
) => {
  return useMutation({
    mutationFn: () => client.delete('/user/cover'),
    mutationKey: [deleteUserCoverKey],
    ...options,
  })
}
