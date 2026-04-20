import { z } from 'zod'

import { regs } from '@/shared/config'

import { fileFormFields } from '../config'

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
