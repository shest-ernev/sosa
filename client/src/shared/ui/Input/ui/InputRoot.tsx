import { forwardRef } from 'react'

import { InputRootProps } from '../types'

import { InputProvider } from './InputProvider'
import { InputLabel } from './InputLabel'

export const InputRoot = forwardRef<HTMLLabelElement, InputRootProps>(
  ({ type = 'text', error, ...props }, ref) => {
    return (
      <InputProvider type={type} error={error}>
        <InputLabel
          {...props}
          ref={ref}
        />
      </InputProvider>
    )
  },
)
