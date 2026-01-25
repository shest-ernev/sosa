import { ReactNode, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import dayJs from 'dayjs'

import { useStore } from '@/shared/hooks'
import { ls } from '@/shared/config'

import 'dayjs/locale/ru'
import 'dayjs/locale/en'

export const LangProvider = observer(
  ({ children }: { children: ReactNode }) => {
    const { i18n } = useTranslation()

    const {
      lang: { activeLang },
    } = useStore()

    dayJs.locale(activeLang)

    useEffect(() => {
      i18n.changeLanguage(activeLang)
      localStorage.setItem(ls.lang, activeLang)
    }, [activeLang, i18n])

    return <>{children}</>
  },
)
