import { useState, useRef, SyntheticEvent } from 'react'
import ReactCrop, {
  PercentCrop,
  makeAspectCrop,
  ReactCropProps,
} from 'react-image-crop'
import cn from 'clsx'

import { CropperProps } from '../types'
import styles from '../styles/index.module.scss'

import 'react-image-crop/dist/ReactCrop.css'
import '../styles/cropper.scss'

export const Cropper = ({
  src,
  aspect = 1,
  onCompleate,
  className,
  ...props
}: CropperProps) => {
  const [crop, setCrop] = useState<PercentCrop>()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const handleLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    if (aspect) {
      setCrop(
        makeAspectCrop(
          {
            unit: '%',
            x: 0,
            y: 0,
            width: 50,
          },
          aspect,
          e.currentTarget.offsetWidth,
          e.currentTarget.offsetHeight,
        ),
      )
    }
  }

  const handleCompleate: ReactCropProps['onComplete'] = (_, v) => {
    if (!canvasRef.current || !imgRef.current) {
      return
    }

    const ctx = canvasRef.current.getContext('2d')

    if (!ctx) {
      return
    }

    const width = imgRef.current.naturalWidth
    const height = imgRef.current.naturalHeight

    const sx = (width / 100) * v.x
    const sy = (height / 100) * v.y
    const dWidth = (width / 100) * v.width
    const dHeight = (height / 100) * v.height

    canvasRef.current.width = dWidth
    canvasRef.current.height = dHeight

    ctx.drawImage(
      imgRef.current,
      sx,
      sy,
      dWidth,
      dHeight,
      0,
      0,
      dWidth,
      dHeight,
    )

    onCompleate?.(canvasRef.current)

    ctx.clearRect(0, 0, 0, 0)
  }

  return (
    <>
      <ReactCrop
        crop={crop}
        aspect={aspect}
        onComplete={handleCompleate}
        className={cn(styles.container, className)}
        onChange={(_, percentCrop) => setCrop(percentCrop)}
        {...props}
      >
        <img
          src={src}
          ref={imgRef}
          onLoad={handleLoad}
          className={styles.img}
        />
      </ReactCrop>
      <canvas
        style={{ display: 'none' }}
        ref={canvasRef}
      />
    </>
  )
}
