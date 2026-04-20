import { ReactNode } from 'react'

export type UserProfileProps = {
  name: string
  subscribers: number
  listeners: number
  description?: string
  avatar?: string
  cover?: string
  after?: ReactNode
}
