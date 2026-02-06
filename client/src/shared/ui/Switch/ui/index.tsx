import { forwardRef } from 'react'
import { Switch as RadixSwitch } from 'radix-ui'

import { SwitchProvider } from './parts/SwitchProvider'
import { SwitchRoot } from './parts/SwicthRoot'
import { SwitchThumb } from './parts/SwitchThumb'

export const Switch = forwardRef<HTMLButtonElement, RadixSwitch.SwitchProps>(
  (props, ref) => {
    return (
      <SwitchProvider>
        <SwitchRoot
          ref={ref}
          {...props}
        >
          <SwitchThumb />
        </SwitchRoot>
      </SwitchProvider>
    )
  },
)
