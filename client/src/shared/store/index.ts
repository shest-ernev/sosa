import { ThemeStore } from './ThemeStore'

class Store {
  readonly theme = new ThemeStore()
}

export const store = new Store()
