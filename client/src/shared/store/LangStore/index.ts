import { makeAutoObservable } from 'mobx'

import { LangVariants } from '@/shared/types'
import { ls, lang } from '@/shared/config'

export class LangStore {
  activeLang: LangVariants =
    (localStorage.getItem(ls.lang) as LangVariants) || lang.en.name

  constructor() {
    makeAutoObservable(this)
  }

  setLang = (v: LangVariants) => {
    localStorage.setItem(ls.lang, v)
    this.activeLang = v
  }
}
