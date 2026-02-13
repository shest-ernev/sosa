import { useMutation, useQuery } from '@tanstack/react-query'

import { client } from '../../client'
import { getAuthKey, logOutKey } from '../../keys'

import { UseGetAuthQueryOptions, UseLogOutMutationOptions } from './types'

export const useGetAuthQuery = (options: UseGetAuthQueryOptions) => {
  return useQuery({
    queryFn: () => client.get('/auth'),
    queryKey: [getAuthKey],
    ...options,
  })
}

export const useLogOutMutation = (options: UseLogOutMutationOptions) => {
  return useMutation({
    mutationFn: () => client.patch('/auth/log-out'),
    mutationKey: [logOutKey],
    ...options,
  })
}
