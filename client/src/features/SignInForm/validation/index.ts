import { z } from 'zod'

import { regs } from '@/shared/config'

import { signInFormFields } from '../config'

export const signInCreateTokenSchema = z.object({
  [signInFormFields.email]: z
    .string('signIn.errors.required')
    .regex(regs.email, 'signIn.errors.email'),
  [signInFormFields.code]: z.string().optional(),
})

export const signInCheckCodeSchema = z.object({
  [signInFormFields.email]: z.string().optional(),
  [signInFormFields.code]: z.string().min(6).max(6),
})
