import { z } from 'zod'

import { regs } from '@/shared/config'

import { changePasswordFormFields } from '../config'

export const changePasswordEmailFormSchema = z.object({
  [changePasswordFormFields.email]: z
    .string()
    .min(1, 'changePassword.errors.required'),
  [changePasswordFormFields.code]: z.string().optional(),
  [changePasswordFormFields.password]: z.string().optional(),
})

export const changePasswordCodeFormSchema = z.object({
  [changePasswordFormFields.email]: z.string().optional(),
  [changePasswordFormFields.code]: z
    .string()
    .min(1, 'changePassword.errors.required'),
  [changePasswordFormFields.password]: z.string().optional(),
})

export const changePasswordNewFormSchema = z.object({
  [changePasswordFormFields.email]: z.string().optional(),
  [changePasswordFormFields.code]: z.string().optional(),
  [changePasswordFormFields.password]: z
    .string()
    .min(7, 'changePassword.errors.passwordMin')
    .regex(regs.password, 'changePassword.errors.passwordReg'),
})
