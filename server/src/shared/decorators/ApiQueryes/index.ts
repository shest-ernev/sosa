import { applyDecorators } from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'

export const ApiQueryes = (...args: string[]) => {
  const decorators = args.map((item) =>
    ApiQuery({ name: item, type: String, required: false })
  )

  return applyDecorators(...decorators)
}
