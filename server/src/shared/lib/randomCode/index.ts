export const randomCode = (length: number) => {
  //const random = () => Math.floor(Math.random() * (9 - 0 + 1)) + 0

  return Array.from({ length }, () => '1').join('')
}
