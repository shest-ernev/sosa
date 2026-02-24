import { z } from 'zod'

import { deletePasswordFormFields } from '../config'

export const deletePasswordFormSchema = z.object({
  [deletePasswordFormFields.password]: z
    .string()
    .min(1, 'userSettings.errors.required'),
})
