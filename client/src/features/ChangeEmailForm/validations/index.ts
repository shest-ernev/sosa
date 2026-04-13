import { z } from 'zod'

import { regs } from '@/shared/config'

import { changeEmailFormFields } from '../config'

export const changeEmailEmailFormSchema = z.object({
  [changeEmailFormFields.code]: z.string().optional(),
  [changeEmailFormFields.email]: z
    .string()
    .min(1, 'changeEmail.errors.required')
    .regex(regs.email, 'changeEmail.errors.email'),
  [changeEmailFormFields.newEmail]: z.string().optional(),
})

export const changeEmailCodeFormSchema = z.object({
  [changeEmailFormFields.code]: z
    .string()
    .min(1, 'changeEmail.errors.required'),
  [changeEmailFormFields.email]: z.string().optional(),
  [changeEmailFormFields.newEmail]: z.string().optional(),
})

export const changeEmailNewEmailFormSchema = z.object({
  [changeEmailFormFields.code]: z.string().optional(),
  [changeEmailFormFields.email]: z.string().optional(),
  [changeEmailFormFields.newEmail]: z
    .string()
    .min(1, 'changeEmail.errors.required')
    .regex(regs.email, 'changeEmail.errors.email'),
})
