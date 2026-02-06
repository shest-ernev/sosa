import { makeAutoObservable } from 'mobx'

import { ThemeVariants } from '@/shared/types'

import { getTheme } from './lib'

export class ThemeStore {
  activeTheme = getTheme()

  constructor() {
    makeAutoObservable(this)
  }

  setTheme = (v: ThemeVariants) => {
    this.activeTheme = v
  }
}
