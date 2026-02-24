import { ThemesOptions } from '../types'
import { deletePasswordFormFields } from '../config'

export const themesOptions: ThemesOptions = [
  {
    name: 'userSettings.light',
    value: 'light',
  },
  {
    name: 'userSettings.dark',
    value: 'dark',
  },
] as const

export const deletePasswordFormDefault = {
  [deletePasswordFormFields.password]: '',
} as const
