import { Ref } from 'react'
import ReactCrop, { ReactCropProps } from 'react-image-crop'

export type CropperProps = Omit<
  ReactCropProps,
  'crop' | 'onChange' | 'children' | 'onComplete'
> & {
  src?: string
  onCompleate?: (canvas: HTMLCanvasElement) => void
  ref?: Ref<ReactCrop>
}
