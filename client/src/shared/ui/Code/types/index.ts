import { unstable_OneTimePasswordField as OneTimePasswordField } from 'radix-ui'

export type CodeContextValue = {
  error?: boolean
  loading?: boolean
}

export type CodeRootProps = OneTimePasswordField.OneTimePasswordFieldProps &
  CodeContextValue
