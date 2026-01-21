import { ReactNode, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { useStore } from '@/shared/hooks'
import { ls } from '@/shared/config'

export const LangProvider = observer(
  ({ children }: { children: ReactNode }) => {
    const { i18n } = useTranslation()

    const {
      lang: { activeLang },
    } = useStore()

    useEffect(() => {
      localStorage.setItem(ls.lang, activeLang)
      i18n.changeLanguage(activeLang)
    }, [activeLang, i18n])

    return <>{children}</>
  },
)
