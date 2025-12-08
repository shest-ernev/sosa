import { ValidationPipe, BadRequestException } from '@nestjs/common'

export const validationErrors = new ValidationPipe({
  exceptionFactory: (errors) => {
    const err = errors.map((obj) => {
      if (obj.constraints) {
        return Object.values(obj.constraints)[0]
      }
    })

    return new BadRequestException({
      message: err[0],
    })
  },
})
