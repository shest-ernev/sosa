import { ReactNode } from 'react'

export type UseResizeLibraryParams = {
  min: number
  max: number
  hiddenWidth: number
}

export type AsideLinkProps = {
  icon: ReactNode
  text: string
  to: string
  hidden: boolean
}
