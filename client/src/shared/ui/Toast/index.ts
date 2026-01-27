import { Toast as RadixToast } from 'radix-ui'

import { ToastRoot } from './ui/ToastRoot'

export const Toast = {
  Provider: RadixToast.Provider,
  Viewport: RadixToast.Viewport,
  Root: ToastRoot,
  Close: RadixToast.Close,
}
