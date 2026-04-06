import { useQuery, useMutation } from '@tanstack/react-query'

import { getUserSettingsKey, editUserSettingsKey } from '../../keys'
import { client } from '../../client'

import {
  UseGetUserSettingsQueryOptions,
  useEditSettingsUserSettingsMutationOptions,
} from './types'

export const useGetUserSettingsQuery = (
  options?: UseGetUserSettingsQueryOptions,
) => {
  return useQuery({
    queryFn: () => client.get('/user-settings'),
    queryKey: [getUserSettingsKey],
    ...options,
  })
}

export const useEditSettingsUserSettingsMutation = (
  options?: useEditSettingsUserSettingsMutationOptions,
) => {
  return useMutation({
    mutationFn: (data) => client.patch('/user-settings', data),
    mutationKey: [editUserSettingsKey],
    ...options,
  })
}
