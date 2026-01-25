import { ls, lang } from '@/shared/config'
import { LangVariants } from '@/shared/types'

export const getLang = (): LangVariants => {
  const variant = localStorage.getItem(ls.lang)

  if (!variant) {
    return 'en'
  }

  if ([lang.en.name, lang.ru.name].includes(variant as LangVariants)) {
    return variant as LangVariants
  }

  return 'en'
}
