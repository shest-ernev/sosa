import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react'

export const useTimer = (
  value: number,
): [number, Dispatch<SetStateAction<number>>] => {
  const [timer, setTimer] = useState(value)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (timer === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      if (timer - 1000 >= 0) {
        setTimer((p) => p - 1000)
      }
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timer])

  return [timer, setTimer]
}
