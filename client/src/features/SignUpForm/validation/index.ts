import { z } from 'zod'

import { regs } from '@/shared/config'

import { signUpFormFields } from '../config'

export const signUpCreateTokenSchema = z.object({
  [signUpFormFields.name]: z
    .string('singUp.errors.required')
    .min(2, 'singUp.errors.minNameLength')
    .max(300, 'singUp.errors.maxNameLength'),
  [signUpFormFields.email]: z
    .string('singUp.errors.required')
    .regex(regs.email, 'singUp.errors.email'),
  [signUpFormFields.agree]: z.boolean().refine((v) => v === true),
  [signUpFormFields.code]: z.string().optional(),
})

export const signUpCheckCodeSchema = z.object({
  [signUpFormFields.name]: z.string().optional(),
  [signUpFormFields.email]: z.string().optional(),
  [signUpFormFields.agree]: z.boolean().optional(),
  [signUpFormFields.code]: z.string().min(6).max(6),
})
