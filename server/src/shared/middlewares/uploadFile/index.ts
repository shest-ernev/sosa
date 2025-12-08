import { UseInterceptors } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { Request } from 'express'

import { getDate } from '@/shared/lib'
import { UploadFileParams } from './types'

export const uploadFile = ({ path, validation, message }: UploadFileParams) => {
  return UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: path,
        filename: (req: Request & { user: { id: string } }, _, cb) => {
          const userId = req.user.id
          const { day, month, year, hours, minutes, seconds, milliseconds } =
            getDate()

          const name = `${userId}_${day}_${month}_${year}_${hours}_${minutes}_${seconds}_${milliseconds}.jpg`

          cb(null, name)
        },
      }),
      fileFilter: (_, file, cb) => {
        if (!file.originalname.match(validation)) {
          return cb(new BadRequestException(message), false)
        }

        cb(null, true)
      },
    })
  )
}
