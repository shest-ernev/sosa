import { ThemeStore } from './ThemeStore'
import { LangStore } from './LangStore'

class Store {
  readonly theme = new ThemeStore()
  readonly lang = new LangStore()
}

export const store = new Store()
