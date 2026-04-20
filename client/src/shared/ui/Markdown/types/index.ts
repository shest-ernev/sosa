import { HTMLAttributes, RefObject } from 'react'

export type MarkdownProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: string
  ref?: RefObject<HTMLDivElement>
}
