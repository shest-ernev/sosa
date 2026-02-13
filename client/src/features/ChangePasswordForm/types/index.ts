import { z } from 'zod'

import {
  changePasswordCodeFormSchema,
  changePasswordNewFormSchema,
  changePasswordEmailFormSchema,
} from '../validations'

export type ChangePasswordFormFields =
  | z.infer<typeof changePasswordCodeFormSchema>
  | z.infer<typeof changePasswordNewFormSchema>
  | z.infer<typeof changePasswordEmailFormSchema>

export type ChangePasswordFormQS = {
  step: '1' | '2' | '3'
  email: string
  token: string
}
