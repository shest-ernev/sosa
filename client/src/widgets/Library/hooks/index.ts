import { useState, useEffect, MouseEvent, useCallback } from 'react'

import { ls } from '@/shared/config'

import { UseResizeLibraryParams } from '../types'

export const useResizeLibrary = (params: UseResizeLibraryParams) => {
  const [width, setWidth] = useState(
    localStorage.getItem(ls.libraryWidth)
      ? Number(localStorage.getItem(ls.libraryWidth))
      : params.min
  )
  const [hidden, setHidden] = useState(width === params.hiddenWidth)
  const [startWidth, setStartWidth] = useState(0)
  const [startX, setStartX] = useState(0)
  const [isResizing, setIsResizing] = useState(false)

  const startResizing = (e: MouseEvent) => {
    setIsResizing(true)
    setStartWidth(width)
    setStartX(e.clientX)
  }

  const stopResizing = () => {
    setIsResizing(false)
  }

  const resize = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!isResizing) {
        return
      }

      const deltaX = e.clientX - startX

      if (startWidth + deltaX >= params.max) {
        return setWidth(params.max)
      }

      if (startWidth + deltaX <= params.min) {
        return setWidth(params.hiddenWidth)
      }

      if (startWidth + deltaX >= params.min) {
        return setWidth(startWidth + deltaX)
      }
    },
    [
      isResizing,
      params.hiddenWidth,
      params.max,
      params.min,
      setWidth,
      startWidth,
      startX,
    ]
  )

  const toggleHidden = () => {
    if (hidden) {
      setWidth(Math.floor(params.max / 1.3))
    } else {
      setWidth(params.hiddenWidth)
    }
  }

  useEffect(() => {
    localStorage.setItem(ls.libraryWidth, String(width))

    setHidden(width === params.hiddenWidth)
  }, [width, params.hiddenWidth])

  useEffect(() => {
    if (isResizing) {
      document.body.style.cursor = 'grabbing'

      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResizing)
    } else {
      document.body.style.cursor = 'default'

      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', stopResizing)
    }

    return () => {
      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', stopResizing)
    }
  }, [isResizing, resize])

  return { width, startResizing, hidden, isResizing, toggleHidden }
}
