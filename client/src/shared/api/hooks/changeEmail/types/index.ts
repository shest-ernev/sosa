import { CustomUseMutationOptions, components } from '@/shared/types'

export type UseChangeEmailEmailMutationOptions = CustomUseMutationOptions<
  components['schemas']['ChangeEmailEmailData'],
  components['schemas']['ChangeEmailEmailBody']
>

export type UseChangeEmailSendCodeMutationOptions = CustomUseMutationOptions<
  components['schemas']['MessageResponse'],
  components['schemas']['ChangeEmailSendCodeBody']
>

export type UseChangeEmailCodeMutationOptions = CustomUseMutationOptions<
  components['schemas']['ChangeEmailCheckCodeData'],
  components['schemas']['ChangeEmailCheckCodeBody']
>

export type useChangeEmailNewMutationOptions = CustomUseMutationOptions<
  components['schemas']['MessageResponse'],
  components['schemas']['ChangeEmailNewEmailBody']
>
