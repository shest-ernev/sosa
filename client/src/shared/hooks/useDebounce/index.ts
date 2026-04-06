import { useRef, useEffect } from 'react'

export const useDebounce = (
  fn: () => void | Promise<void>,
  ms?: number,
  dep?: unknown[],
) => {
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
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
