import { getTranslate } from '@/shared/lib'
import { ThemesOptions } from '../types'

export const themesOptions: ThemesOptions = [
  {
    name: getTranslate('userSettings.light'),
    value: 'light',
  },
  {
    name: getTranslate('userSettings.dark'),
    value: 'dark',
  },
]
