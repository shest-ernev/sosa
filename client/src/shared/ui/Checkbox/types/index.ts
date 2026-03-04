import { InputHTMLAttributes, Ref } from 'react'

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  error?: boolean
  ref?: Ref<HTMLInputElement>
}
