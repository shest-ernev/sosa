import { ApiResponse } from '@nestjs/swagger'
import { applyDecorators } from '@nestjs/common'

import { MessageResponse } from '@/shared/schemas'

export const ApiError = (...err: number[]) => {
  const decorators = err.map((item) =>
    ApiResponse({
      status: item,
      type: MessageResponse,
    }),
  )

  return applyDecorators(...decorators)
}
