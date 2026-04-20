import {
  components,
  CustomUseMutationOptions,
  CustomUseQueryOptions,
} from '@/shared/types'

export type UseGetUserQueryOptions = CustomUseQueryOptions<
  components['schemas']['GetUserData']
>

export type UseEditUserNameMutationOptions = CustomUseMutationOptions<
  components['schemas']['MessageResponse'],
  components['schemas']['UserEditNameBody']
>

export type UseEditUserDescriptionMutationOptions = CustomUseMutationOptions<
  components['schemas']['MessageResponse'],
  FormData
>

export type UseEditUserAvatarMutationOptions = CustomUseMutationOptions<
  components['schemas']['MessageResponse'],
  FormData
>

export type UseDeleteUserAvatarMutationOptions = CustomUseMutationOptions<
  components['schemas']['MessageResponse']
>

export type UseEditUserCoverMutationOptions = CustomUseMutationOptions<
  components['schemas']['MessageResponse'],
  FormData
>

export type UseDeleteUserCoverMutationOptions = CustomUseMutationOptions<
  components['schemas']['MessageResponse']
>
