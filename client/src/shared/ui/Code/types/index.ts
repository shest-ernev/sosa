import { unstable_OneTimePasswordField as OneTimePasswordField } from 'radix-ui'

export type CodeContextValue = {
  error?: boolean
}

export type CodeRootProps = OneTimePasswordField.OneTimePasswordFieldProps & {
  error?: boolean
}
