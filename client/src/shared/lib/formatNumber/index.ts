export const formatNumber = (value: number) => {
  const abs = Math.abs(value)
  const suffixes = ['', 'k', 'M', 'B', 'T', 'Q']

  if (abs < 1000) return `${value}`

  let suffixIndex = 0
  let next = value

  while (Math.abs(next) >= 1000 && suffixIndex < suffixes.length - 1) {
    next /= 1000
    suffixIndex += 1
  }

  return `${Number(next.toFixed(1))}${suffixes[suffixIndex]}`
}
