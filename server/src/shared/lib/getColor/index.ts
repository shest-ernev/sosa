import * as sharp from 'sharp'

export const getColor = async (path: string) => {
  try {
    const { data, info } = await sharp(path)
      .raw()
      .toBuffer({ resolveWithObject: true })

    const { channels } = info

    let r = 0,
      g = 0,
      b = 0,
      count = 0

    for (let i = 0; i < data.length; i += channels) {
      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
      count++
    }

    r = Math.round(r / count)
    g = Math.round(g / count)
    b = Math.round(b / count)

    //const toHex = (c: number) => {
    //  const hex = Math.round(c).toString(16)
    //  return hex.length === 1 ? '0' + hex : hex
    //}

    //const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`
    const rgb = `${r}, ${g}, ${b}`

    return rgb
  } catch (err) {
    console.log(err)

    return ''
  }
}
