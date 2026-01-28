import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import Backend from 'i18next-http-backend'

import { lang } from '@/shared/config'

import ru from './locales/ru.json'
import en from './locales/en.json'

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: lang.en.name,
    resources: {
      [lang.ru.name]: {
        translation: ru,
      },
      [lang.en.name]: {
        translation: en,
      },
    },
  })

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: typeof ru | typeof en
    }
  }
}
