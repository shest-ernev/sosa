import { z } from 'zod'

import {
  changeEmailCodeFormSchema,
  changeEmailEmailFormSchema,
  changeEmailNewEmailFormSchema,
} from '../validations'

export type ChangeEmailFormFields =
  | z.infer<typeof changeEmailCodeFormSchema>
  | z.infer<typeof changeEmailEmailFormSchema>
  | z.infer<typeof changeEmailNewEmailFormSchema>

export type ChangeEmailFormQS = {
  email: string
  step: '1' | '2' | '3'
  token: string
}
