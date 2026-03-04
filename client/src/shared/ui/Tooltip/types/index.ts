import { Ref } from 'react'
import { Tooltip } from 'radix-ui'

export type TooltipContentProps = Tooltip.TooltipContentProps & {
  ref?: Ref<HTMLDivElement>
}
