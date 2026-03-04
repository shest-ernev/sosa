import { ButtonHTMLAttributes, Ref } from 'react'

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> & {
  color?: 'primary' | 'secondary' | 'danger' | 'succesfully'
  variant?: 'contain' | 'outline' | 'text'
  asChild?: boolean
  loading?: boolean
  ref?: Ref<HTMLButtonElement>
}
