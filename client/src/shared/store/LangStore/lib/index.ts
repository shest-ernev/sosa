import { ls, langs } from '@/shared/config'
import { LangVariants } from '@/shared/types'

export const getLang = (): LangVariants => {
  const variant = localStorage.getItem(ls.lang)

  if (!variant) {
    return 'en'
  }

  if ([langs.en.name, langs.ru.name].includes(variant as LangVariants)) {
    return variant as LangVariants
  }

  return 'en'
}
