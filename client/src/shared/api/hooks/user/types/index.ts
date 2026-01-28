import { components, CustomUseQueryOptions } from '@/shared/types'

export type UseGetUserQueryOptions = CustomUseQueryOptions<
  components['schemas']['GetUserData']
>
