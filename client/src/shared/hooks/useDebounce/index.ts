import { useRef, useEffect } from 'react'

export const useDebounce = (
  fn: () => void | Promise<void>,
  ms?: number,
  dep?: unknown[],
) => {
  const isFirstRenderRef = useRef(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false

      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(fn, ms || 300)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, dep || [])
}
