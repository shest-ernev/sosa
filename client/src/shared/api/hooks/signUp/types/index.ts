import {
  CustomUseMutationOptions,
  MessageResponse,
  components,
} from '@/shared/types'

export type UseSignUpCreateTokenMutationOptions = CustomUseMutationOptions<
  components['schemas']['SignUpDataData'],
  components['schemas']['SignUpDataBody']
>

export type UseSignUpCheckCodeMutationOptions = CustomUseMutationOptions<
  components['schemas']['SignUpCodeData'],
  components['schemas']['SignUpCodeBody']
>

export type UseSignUpSendCodeMutationOptions = CustomUseMutationOptions<
  MessageResponse,
  components['schemas']['SignUpSendCodeBody']
>
