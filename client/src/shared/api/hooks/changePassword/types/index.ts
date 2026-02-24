import { CustomUseMutationOptions, components } from '@/shared/types'

export type UseChangePasswordEmailMutationOptions = CustomUseMutationOptions<
  components['schemas']['ChangePasswordEmailData'],
  components['schemas']['ChangePasswordEmailBody']
>

export type UseChangePasswordCodeMutationOptions = CustomUseMutationOptions<
  components['schemas']['ChangePasswordCheckCodeData'],
  components['schemas']['ChangePasswordCheckCodeBody']
>

export type UseChangePasswordNewMutationOptions = CustomUseMutationOptions<
  components['schemas']['MessageResponse'],
  components['schemas']['ChangePasswordNewBody']
>

export type UseChangePasswordSendCodeMutationOptions = CustomUseMutationOptions<
  components['schemas']['MessageResponse'],
  components['schemas']['ChangePasswordSendCodeBody']
>

export type UseChangePasswordDeleteMutationOptions = CustomUseMutationOptions<
  components['schemas']['MessageResponse'],
  components['schemas']['ChangePasswordDeleteBody']
>
