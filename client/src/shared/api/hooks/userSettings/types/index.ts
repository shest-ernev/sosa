import {
  CustomUseQueryOptions,
  CustomUseMutationOptions,
  components,
} from '@/shared/types'

export type UseGetUserSettingsQueryOptions = CustomUseQueryOptions<
  components['schemas']['GetUserSettings']
>

export type useEditSettingsUserSettingsMutationOptions =
  CustomUseMutationOptions<
    components['schemas']['MessageResponse'],
    components['schemas']['EditUserSettingsBody']
  >
