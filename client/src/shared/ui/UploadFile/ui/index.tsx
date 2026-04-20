import { useState, DragEvent } from 'react'
import cn from 'clsx'

import { UploadFileProps } from '../types'
import styles from '../styles/index.module.scss'

export const UploadFile = ({
  className,
  ref,
  children,
  error,
  onDragOver,
  onDragLeave,
  onDrop,
  ...props
}: UploadFileProps) => {
  const [isDrag, setIsDrag] = useState(false)

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()

    setIsDrag(true)

    onDragOver?.(e)
  }

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()

    setIsDrag(false)

    onDragLeave?.(e)
  }

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()

    setIsDrag(false)

    onDrop?.(e)
  }

  return (
    <label
      className={cn(
        styles.container,
        isDrag && styles.drag,
        error && styles.error,
        className,
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
      <input
        type='file'
        ref={ref}
        className={styles.input}
        {...props}
      />
    </label>
  )
}
