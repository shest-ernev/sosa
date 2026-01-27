import {
  CustomUseMutationOptions,
  MessageResponse,
  components,
} from '@/shared/types'

export type UseSignUpCreateTokenMutationOptions = CustomUseMutationOptions<
  components['schemas']['SignUpCreateTokenData'],
  components['schemas']['SignUpCreateTokenBody']
>

export type UseSignUpCheckCodeMutationOptions = CustomUseMutationOptions<
  components['schemas']['SignUpCheckCodeData'],
  components['schemas']['SignUpCheckCodeBody']
>

export type UseSignUpSendCodeMutationOptions = CustomUseMutationOptions<
  MessageResponse,
  components['schemas']['SignUpSendCodeBody']
>
