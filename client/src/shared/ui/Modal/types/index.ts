import { Ref } from 'react'
import { Dialog } from 'radix-ui'

export type ModalProps = Dialog.DialogContentProps & {
  ref?: Ref<HTMLDivElement>
}
