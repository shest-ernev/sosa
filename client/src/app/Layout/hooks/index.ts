import { useState } from 'react'

export const useFullScreen = (): [boolean, (value: boolean) => void] => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  const handleSetIsFullScreen = (value: boolean) => {
    if (value) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }

    setIsFullScreen(value)
  }

  return [isFullScreen, handleSetIsFullScreen]
}
