import { Ref } from 'react'
import { Select } from 'radix-ui'

export type SelectTriggerProps = Select.SelectTriggerProps & {
  icon?: boolean
  ref?: Ref<HTMLButtonElement>
}

export type SelectItemProps = Select.SelectItemProps & {
  ref?: Ref<HTMLDivElement>
}

export type SelectContentProps = Select.SelectContentProps & {
  ref?: Ref<HTMLDivElement>
}
