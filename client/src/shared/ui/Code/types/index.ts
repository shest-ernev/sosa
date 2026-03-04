import { Ref } from 'react'
import { unstable_OneTimePasswordField as OneTimePasswordField } from 'radix-ui'

export type CodeContextValue = {
  error?: boolean
  loading?: boolean
}

export type CodeInputProps =
  OneTimePasswordField.OneTimePasswordFieldInputProps & {
    ref?: Ref<HTMLDivElement>
  }

export type CodeRootProps = OneTimePasswordField.OneTimePasswordFieldProps &
  CodeContextValue & {
    ref?: Ref<HTMLDivElement>
  }
