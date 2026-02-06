import { ScrollArea } from 'radix-ui'

export type PageLayoutProps = Omit<ScrollArea.ScrollAreaProps, 'title'> & {
  title?: string
  viewHeader?: number
  play?: boolean
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
