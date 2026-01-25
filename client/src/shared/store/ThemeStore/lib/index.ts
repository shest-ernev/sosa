import { ls } from '@/shared/config'

export const getTheme = (): 'dark' | 'light' => {
  const theme = localStorage.getItem(ls.theme)

  if (!theme) {
    return 'dark'
  }

  if (['dark', 'light'].includes(theme)) {
    return theme as 'dark' | 'light'
  }

  return 'dark'
}
