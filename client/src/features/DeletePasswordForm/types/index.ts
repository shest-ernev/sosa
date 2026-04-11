import { z } from 'zod'

import { deletePasswordFormSchema } from '../validations'

export type DeletePasswordFormFields = z.infer<typeof deletePasswordFormSchema>

export type DeletePasswordFormQS = {
  token: string
  email: string
}
