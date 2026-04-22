import { z } from 'zod'

import { fileFormSchema, nameFormSchema } from '../validations'

export type FileFormFields = z.infer<typeof fileFormSchema>
export type NameFormFields = z.infer<typeof nameFormSchema>

export type EditProfileProps = {
  avatar: boolean
  cover: boolean
  name: string
}

export type EditProfileAvatarProps = {
  avatar: boolean
}

export type EditProfileCoverProps = {
  cover: boolean
}

export type EditProfileNameProps = {
  name: string
}
