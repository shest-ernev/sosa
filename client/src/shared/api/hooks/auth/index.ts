import { useQuery } from '@tanstack/react-query'

import { api } from '../../lib'
import { getAuthKey } from '../../keys'

import { UseGetAuthQueryOptions } from './types'

export const useGetAuthQuery = (options: UseGetAuthQueryOptions) => {
  return useQuery({
    queryFn: () => api.get('/auth'),
    queryKey: [getAuthKey],
    ...options,
  })
}
