import {
  CustomUseQueryOptions,
  CustomUseMutationOptions,
  components,
  MessageResponse,
} from '@/shared/types'

export type UseGetAuthQueryOptions = CustomUseQueryOptions<
  components['schemas']['GetAuthData']
>

export type UseLogOutMutationOptions = CustomUseMutationOptions<MessageResponse>
