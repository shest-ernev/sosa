import { useEffect, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from '@/shared/hooks'
import { themes } from '@/shared/config'

export const ThemeProvider = observer(
  ({ children }: { children: ReactNode }) => {
    const {
      theme: { activeTheme },
    } = useStore()

    const theme = themes[activeTheme]

    useEffect(() => {
      Object.keys(theme).map((key) => {
        document.documentElement.style.setProperty(
          key,
          theme[key as keyof typeof theme]
        )
      })
    }, [theme])

    return <>{children}</>
  }
)
