import { Ref } from 'react'
import { Switch } from 'radix-ui'

export type SwitchContextValue = {
  animate: boolean
  setAnimate: (v: boolean) => void
}

export type SwitchThumbProps = Switch.SwitchThumbProps & {
  ref?: Ref<HTMLSpanElement>
}

export type SwitchRootProps = Switch.SwitchProps & {
  ref?: Ref<HTMLButtonElement>
}
