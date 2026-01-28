import { Dialog } from 'radix-ui'

import { ModalContent } from './ui/ModalContent'

export const Modal = {
  Provider: Dialog.Root,
  Trigger: Dialog.Trigger,
  Content: ModalContent,
  Close: Dialog.Close,
}
