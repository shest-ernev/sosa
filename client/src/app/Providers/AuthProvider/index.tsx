import { ReactNode, useEffect } from 'react'

import { useStore } from '@/shared/hooks'
import { ls } from '@/shared/config'
import { useGetAuthQuery } from '@/shared/api'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { auth, theme, lang } = useStore()

  const isEnabled =
    !!localStorage.getItem(ls.accessToken) ||
    !!localStorage.getItem(ls.refreshToken)

  const { data } = useGetAuthQuery({
    enabled: isEnabled,
  })

  useEffect(() => {
    if (data?.data) {
      auth.setIsAuth(true)
      theme.setTheme(data.data.theme)
      lang.setLang(data.data.lang)
    }
  }, [data])

  return <>{children}</>
}
