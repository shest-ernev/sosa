import { ReactNode, useState } from 'react'

import { SwitchContext } from '../../lib'

export const SwitchProvider = ({ children }: { children: ReactNode }) => {
  const [animate, setAnimate] = useState(false)

  return (
    <SwitchContext.Provider value={{ animate, setAnimate }}>
      {children}
    </SwitchContext.Provider>
  )
}
