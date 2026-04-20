import { InputHTMLAttributes, RefObject, DragEventHandler } from 'react'

export type UploadFileProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onDragOver' | 'onDragLeave' | 'onDrop'
> & {
  ref?: RefObject<HTMLInputElement>
  error?: boolean
  onDragOver?: DragEventHandler<HTMLLabelElement>
  onDragLeave?: DragEventHandler<HTMLLabelElement>
  onDrop?: DragEventHandler<HTMLLabelElement>
}
