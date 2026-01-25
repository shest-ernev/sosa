import { ls } from '@/shared/config'

export const getWidthLibrary = (min: number) => {
  const width = localStorage.getItem(ls.libraryWidth)

  if (!width) {
    return min
  }

  if (Number.isNaN(Number(width))) {
    return min
  }

  return Number(width)
}
