import { SwitchRootProps } from '../types'

import { SwitchProvider } from './parts/SwitchProvider'
import { SwitchRoot } from './parts/SwicthRoot'
import { SwitchThumb } from './parts/SwitchThumb'

export const Switch = (props: SwitchRootProps) => {
  return (
    <SwitchProvider>
      <SwitchRoot {...props}>
        <SwitchThumb />
      </SwitchRoot>
    </SwitchProvider>
  )
}
