import { z } from 'zod'

import { signUpCreateTokenSchema, signUpSendCodeSchema } from '../lib'

export type SignUpFormFields =
  | z.infer<typeof signUpCreateTokenSchema>
  | z.infer<typeof signUpSendCodeSchema>

export type SignUpFormQS = {
  name: string
  email: string
  token: string
}
