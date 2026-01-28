import { useMutation, useQuery } from '@tanstack/react-query'

import { api } from '../../lib'
import { getAuthKey, logOutKey } from '../../keys'

import { UseGetAuthQueryOptions, UseLogOutMutationOptions } from './types'

export const useGetAuthQuery = (options: UseGetAuthQueryOptions) => {
  return useQuery({
    queryFn: () => api.get('/auth'),
    queryKey: [getAuthKey],
    ...options,
  })
}

export const useLogOutMutation = (options: UseLogOutMutationOptions) => {
  return useMutation({
    mutationFn: () => api.get('/auth/log-out'),
    mutationKey: [logOutKey],
    ...options,
  })
}
