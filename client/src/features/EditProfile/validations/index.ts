import { z } from 'zod'

import { regs } from '@/shared/config'

import { fileFormFields, nameFormFields } from '../config'

export const fileFormSchema = z.object({
  [fileFormFields.image]: z
    .instanceof(Blob)
    .refine((data) => data !== undefined, 'profile.editAvatar.errors.selectArea'),
  [fileFormFields.file]: z
    .instanceof(File)
    .optional()
    .refine((file) => file !== undefined, 'profile.editAvatar.errors.requiredFile')
    .refine((file) => !file || regs.fileImage.test(file.name.toLowerCase()), {
      message: 'profile.editAvatar.errors.invalidFile',
    }),
})

export const nameFormSchema = z.object({
  [nameFormFields.name]: z
    .string('profile.editName.errors.required')
    .min(2, 'profile.editName.errors.minNameLength')
    .max(300, 'profile.editName.errors.maxNameLength'),
})
