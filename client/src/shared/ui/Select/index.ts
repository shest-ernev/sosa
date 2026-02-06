import { Select as RadixSelect } from 'radix-ui'

import { SelectTrigger } from './ui/SelectTrigger'
import { SelectContent } from './ui/SelectContent'
import { SelectItem } from './ui/SelectItem'

export const Select = {
  Root: RadixSelect.Root,
  Trigger: SelectTrigger,
  Value: RadixSelect.Value,
  Content: SelectContent,
  Item: SelectItem,
}
