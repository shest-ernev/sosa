import {
  CustomUseMutationOptions,
  MessageResponse,
  components,
} from '@/shared/types'

export type UseSignInCreateTokenMutationOptions = CustomUseMutationOptions<
  components['schemas']['SignInCreateTokenData'],
  components['schemas']['SignInCreateTokenBody']
>

export type UseSignInCheckCodeMutationOptions = CustomUseMutationOptions<
  components['schemas']['SignInCheckCodeData'],
  components['schemas']['SignInCheckCodeBody']
>

export type UseSignInSendCodeMutationOptions = CustomUseMutationOptions<
  MessageResponse,
  components['schemas']['SignInSendCodeBody']
>
