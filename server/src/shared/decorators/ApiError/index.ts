import { ApiResponse } from '@nestjs/swagger'
import { applyDecorators } from '@nestjs/common'

import { MessageResponse } from '@/shared/schemas'

export const ApiError = () => {
  return applyDecorators(
    ApiResponse({
      status: 500,
      type: MessageResponse,
    })
  )
}
