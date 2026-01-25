export type SendCodeFormProps = {
  backLink: string
  email?: string
  error?: boolean
  value?: string
  onSubmit?: () => void | Promise<void>
  onChange?: (v: string) => void
  onAgainSend?: () => void | Promise<void>
}
