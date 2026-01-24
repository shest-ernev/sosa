import { createContext } from 'react'

import { CodeContextValue } from '../types'

export const CodeContext = createContext<CodeContextValue>({
  error: false,
})
