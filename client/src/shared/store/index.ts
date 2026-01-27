import { ThemeStore } from './ThemeStore'
import { LangStore } from './LangStore'
import { AuthStore } from './AuthStore'
import { ToastStore } from './ToastStore'

class Store {
  readonly theme = new ThemeStore()
  readonly lang = new LangStore()
  readonly auth = new AuthStore()
  readonly toast = new ToastStore()
}

export const store = new Store()
