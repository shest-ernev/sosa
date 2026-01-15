import { HTMLAttributes } from 'react'

export type TextProps = Omit<HTMLAttributes<HTMLElement>, 'color'> & {
  color?: 'primary' | 'secondary' | 'succesfully' | 'danger'
  size?: 's' | 'm' | 'l' | 'xl' | 'xxl'
  weight?: number
  tag?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
