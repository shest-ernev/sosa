import { makeAutoObservable } from 'mobx'

import { getTheme } from './lib'

export class ThemeStore {
  activeTheme = getTheme()

  constructor() {
    makeAutoObservable(this)
  }

  setTheme = (v: 'light' | 'dark') => {
    this.activeTheme = v
  }
}
