import { makeAutoObservable } from 'mobx'

import { ls } from '@/shared/config'

export class AuthStore {
  isAuth = !!localStorage.getItem(ls.accessToken)

  constructor() {
    makeAutoObservable(this)
  }

  setIsAuth = (v: boolean) => {
    this.isAuth = v
  }
}
