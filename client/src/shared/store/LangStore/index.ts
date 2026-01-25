import { makeAutoObservable } from 'mobx'

import { LangVariants } from '@/shared/types'

import { getLang } from './lib'

export class LangStore {
  activeLang = getLang()

  constructor() {
    makeAutoObservable(this)
  }

  setLang = (v: LangVariants) => {
    this.activeLang = v
  }
}
