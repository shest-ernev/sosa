import { useEffect, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '@/shared/hooks'
import { themes, ls } from '@/shared/config'

export const ThemeProvider = observer(
  ({ children }: { children: ReactNode }) => {
    const {
      theme: { activeTheme },
    } = useStore()

    useEffect(() => {
      const theme = themes[activeTheme]

      localStorage.setItem(ls.theme, activeTheme)

      Object.keys(theme).map((key) => {
        document.documentElement.style.setProperty(
          key,
          theme[key as keyof typeof theme],
        )
      })
    }, [activeTheme])

    return <>{children}</>
  },
)
