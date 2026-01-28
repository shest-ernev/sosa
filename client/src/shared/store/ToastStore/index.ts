import { makeAutoObservable } from 'mobx'

import { Toast } from './types'

export class ToastStore {
  toasts: Toast[] = []

  constructor() {
    makeAutoObservable(this)
  }

  add = (params: Omit<Toast, 'id'>) => {
    const date = new Date()

    const id = `${date.getFullYear()}_${date.getDay()}_${date.getHours()}_${date.getMinutes()}_${date.getMilliseconds()}`

    this.toasts.push({
      id,
      ...params,
    })
  }

  remove = (id: string) => {
    this.toasts = this.toasts.filter((obj) => obj.id !== id)
  }
}
