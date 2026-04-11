import { z } from 'zod'

import { deletePasswordFormFields } from '../config'

export const deletePasswordFormSchema = z.object({
  [deletePasswordFormFields.code]: z
    .string()
    .min(1, 'deletePasswordForm.errors.required'),
})
