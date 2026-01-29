import { z } from 'zod'

import { signInCreateTokenSchema, signInCheckCodeSchema } from '../validation'

export type SignInFormFields =
  | z.infer<typeof signInCreateTokenSchema>
  | z.infer<typeof signInCheckCodeSchema>

export type SignInFormQS = {
  email: string
  token: string
}
