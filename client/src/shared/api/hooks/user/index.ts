import { useQuery } from '@tanstack/react-query'

import { client } from '../../client'
import { getUserKey } from '../../keys'

import { UseGetUserQueryOptions } from './types'

export const useGetUserQuery = (options?: UseGetUserQueryOptions) => {
  return useQuery({
    queryFn: () => client.get('/user'),
    queryKey: [getUserKey],
    ...options,
  })
}
