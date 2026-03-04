import { Ref } from 'react'
import { ParseKeys } from 'i18next'
import { ScrollArea } from 'radix-ui'

export type PageLayoutProps = Omit<ScrollArea.ScrollAreaProps, 'title'> & {
  title: ParseKeys
  viewHeader?: number
  play?: boolean
  ref?: Ref<HTMLDivElement>
  onBack?: () => void
  onPlay?: () => void
  onPause?: () => void
}

export type PageLayoutHeaderProps = Pick<
  PageLayoutProps,
  'onPlay' | 'title' | 'onBack' | 'onPause' | 'play'
> & {
  hidden: boolean
}
