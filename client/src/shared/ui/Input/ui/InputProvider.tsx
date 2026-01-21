import { useState } from 'react'

import { InputContext } from '../lib'
import { InputContextValue, InputProviderProps } from '../types'

export const InputProvider = ({
  type = 'text',
  error = false,
  children,
}: InputProviderProps) => {
  const [inputType, setInputType] = useState(type)
  const [isFocus, setIsFocus] = useState(false)

  const contextValue: InputContextValue = {
    type: inputType,
    defaultType: type,
    focus: isFocus,
    error,
    setType: setInputType,
    setFocus: setIsFocus,
  }

  return (
    <InputContext.Provider value={contextValue}>
      {children}
    </InputContext.Provider>
  )
}
