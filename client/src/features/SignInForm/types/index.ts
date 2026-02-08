import { z } from 'zod'

import {
  signInCreateTokenSchema,
  signInCheckCodeSchema,
  signInCheckPassSchema,
} from '../validation'

export type SignInFormFields =
  | z.infer<typeof signInCreateTokenSchema>
  | z.infer<typeof signInCheckCodeSchema>
  | z.infer<typeof signInCheckPassSchema>

export type SignInFormQS = {
  step: '1' | '2' | '3'
  email: string
  token: string
}
