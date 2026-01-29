import { useState, forwardRef, useRef, SyntheticEvent } from 'react'
import ReactCrop, {
  PercentCrop,
  makeAspectCrop,
  ReactCropProps,
} from 'react-image-crop'

import { CropperProps } from '../types'
import styles from '../styles/index.module.scss'

import 'react-image-crop/dist/ReactCrop.css'
import '../styles/cropper.scss'

export const Cropper = forwardRef<ReactCrop, CropperProps>(
  ({ src, aspect = 1, onCompleate, ...props }, ref) => {
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
              height: 20,
              width: 20,
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
          ref={ref}
          aspect={aspect}
          onComplete={handleCompleate}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          {...props}
        >
          <div className={styles.container}>
            <img
              src={src}
              ref={imgRef}
              onLoad={handleLoad}
              className={styles.img}
            />
          </div>
        </ReactCrop>
        <canvas
          style={{ display: 'none' }}
          ref={canvasRef}
        />
      </>
    )
  },
)
