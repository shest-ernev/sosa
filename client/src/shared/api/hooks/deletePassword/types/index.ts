import { CustomUseMutationOptions, components } from '@/shared/types'

export type UseDeletePasswordCreateMutationOptions = CustomUseMutationOptions<
  components['schemas']['DeletePasswordCreateData']
>

export type UseDeletePasswordSendCodeMutationOptions = CustomUseMutationOptions<
  components['schemas']['MessageResponse'],
  components['schemas']['DeletePasswordSendCodeBody']
>

export type UseDeletePasswordCheckCodeMutationOptions =
  CustomUseMutationOptions<
    components['schemas']['MessageResponse'],
    components['schemas']['DeletePasswordCheckCodeBody']
  >
