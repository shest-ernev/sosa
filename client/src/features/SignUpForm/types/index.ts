import { z } from 'zod'

import { signUpCreateTokenSchema, signUpCheckCodeSchema } from '../validation'

export type SignUpFormFields =
  | z.infer<typeof signUpCreateTokenSchema>
  | z.infer<typeof signUpCheckCodeSchema>

export type SignUpFormQS = {
  name: string
  email: string
  token: string
}
