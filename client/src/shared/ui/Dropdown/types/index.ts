import { Ref } from 'react'
import { DropdownMenu } from 'radix-ui'

export type DropdownContentProps = DropdownMenu.DropdownMenuContentProps & {
  ref?: Ref<HTMLDivElement>
}

export type DropdownItemProps = DropdownMenu.DropdownMenuLabelProps & {
  ref?: Ref<HTMLDivElement>
}
