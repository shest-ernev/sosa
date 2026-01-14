import { makeAutoObservable } from 'mobx'

import { ls } from '@/shared/config'

export class ThemeStore {
  activeTheme: 'light' | 'dark' =
    (localStorage.getItem(ls.theme) as 'light' | 'dark') || 'dark'

  constructor() {
    makeAutoObservable(this)
  }

  setTheme = (v: 'light' | 'dark') => {
    this.activeTheme = v
    localStorage.setItem(ls.theme, v)
  }
}
