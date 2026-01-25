import { ls } from '@/shared/config'

export const getWidthLibrary = (min: number, max: number) => {
  const width = localStorage.getItem(ls.libraryWidth)

  if (!width) {
    return min
  }

  if (Number.isNaN(Number(width))) {
    return min
  }

  const numWidth = Number(width)

  if (numWidth <= max && numWidth >= min) {
    return numWidth
  }

  return min
}
