import { createContext } from 'react'

import { SwitchContextValue } from '../types'

export const SwitchContext = createContext<SwitchContextValue>({
  animate: false,
  setAnimate: () => {},
})
