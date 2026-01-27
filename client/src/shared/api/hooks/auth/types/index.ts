import { CustomUseQueryOptions, components } from '@/shared/types'

export type UseGetAuthQueryOptions = CustomUseQueryOptions<
  components['schemas']['GetAuthData']
>
