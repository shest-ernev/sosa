import { ls } from '@/shared/config'
import { ThemeVariants } from '@/shared/types'

export const getTheme = (): ThemeVariants => {
  const theme = localStorage.getItem(ls.theme)

  if (!theme) {
    return 'dark'
  }

  if (['dark', 'light'].includes(theme)) {
    return theme as ThemeVariants
  }

  return 'dark'
}
