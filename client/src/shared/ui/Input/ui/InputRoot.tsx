import { InputRootProps } from '../types'

import { InputProvider } from './InputProvider'
import { InputLabel } from './InputLabel'

export const InputRoot = ({
  type = 'text',
  error,
  ...props
}: InputRootProps) => {
  return (
    <InputProvider
      type={type}
      error={error}
    >
      <InputLabel {...props} />
    </InputProvider>
  )
}
