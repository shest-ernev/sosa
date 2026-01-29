import { FormEvent } from 'react'

export type SendCodeFormProps = {
  backLink: string
  email?: string
  error?: boolean
  value?: string
  loading?: boolean
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void | Promise<void>
  onChange?: (v: string) => void
  onAgainSend?: () => void | Promise<void>
}
