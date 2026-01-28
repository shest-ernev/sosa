import { useQuery } from '@tanstack/react-query'

import { api } from '../../lib'
import { getUserKey } from '../../keys'

import { UseGetUserQueryOptions } from './types'

export const useGetUserQuery = (options?: UseGetUserQueryOptions) => {
  return useQuery({
    queryFn: () => api.get('/user'),
    queryKey: [getUserKey],
    ...options,
  })
}
