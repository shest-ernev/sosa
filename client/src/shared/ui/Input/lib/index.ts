import { createContext } from 'react'

import { InputContextValue } from '../types'

export const InputContext = createContext<InputContextValue>({
  type: 'text',
  defaultType: 'text',
  focus: false,
  error: false,
  setType: () => {},
  setFocus: () => {},
})
