import { Ref } from 'react'
import { ScrollArea } from 'radix-ui'

export type ScrollAreaRootProps = ScrollArea.ScrollAreaProps & {
  ref?: Ref<HTMLDivElement>
}

export type ScrollAreaScrollbarPropsProps =
  ScrollArea.ScrollAreaScrollbarProps & {
    ref?: Ref<HTMLDivElement>
  }
