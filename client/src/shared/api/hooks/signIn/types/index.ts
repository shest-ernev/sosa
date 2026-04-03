import { CustomUseMutationOptions, components } from '@/shared/types'

export type UseSignInEmailMutationOptions = CustomUseMutationOptions<
  components['schemas']['SignInEmailData'],
  components['schemas']['SignInEmailBody']
>

export type UseSignInCodeMutationOptions = CustomUseMutationOptions<
  components['schemas']['SignInCodeData'],
  components['schemas']['SignInCodeBody']
>

export type UseSignInSendCodeMutationOptions = CustomUseMutationOptions<
  components['schemas']['MessageResponse'],
  components['schemas']['SignInSendCodeBody']
>

export type UseSignInPasswordMutationOptions = CustomUseMutationOptions<
  components['schemas']['SignInPasswordData'],
  components['schemas']['SignInPasswordBody']
>
