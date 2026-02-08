import { CustomUseMutationOptions, components } from '@/shared/types'

export type UseSignInCreateTokenMutationOptions = CustomUseMutationOptions<
  components['schemas']['SignInCreateTokenData'],
  components['schemas']['SignInCreateTokenBody']
>

export type UseSignInCheckCodeMutationOptions = CustomUseMutationOptions<
  components['schemas']['SignInCheckCodeData'],
  components['schemas']['SignInCheckCodeBody']
>

export type UseSignInSendCodeMutationOptions = CustomUseMutationOptions<
  components['schemas']['MessageResponse'],
  components['schemas']['SignInSendCodeBody']
>

export type UseSignInCheckPassMutationOptions = CustomUseMutationOptions<
  components['schemas']['SignInCheckPassData'],
  components['schemas']['SignInCheckPassBody']
>
