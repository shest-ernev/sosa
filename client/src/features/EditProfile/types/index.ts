import { z } from 'zod'

import { fileFormSchema } from '../validations'

export type FileFormFields = z.infer<typeof fileFormSchema>

export type EditProfileProps = {
  avatar: boolean
  cover: boolean
}

export type EditProfileAvatarProps = {
  avatar: boolean
}

export type EditProfileCoverProps = {
  cover: boolean
}
