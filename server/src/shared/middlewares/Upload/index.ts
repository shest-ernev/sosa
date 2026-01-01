import { UseInterceptors } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

import { getDate } from '@/shared/lib'
import { RequestWithUser } from '@/shared/types'

import { UploadParams } from './types'

export const Upload = ({ path, validation, message, file }: UploadParams) => {
  return UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: path,
        filename: (req: RequestWithUser, _, cb) => {
          const userId = req.user.id
          const { day, month, year, hours, minutes, seconds, milliseconds } =
            getDate()

          const name = `${userId}_${day}_${month}_${year}_${hours}_${minutes}_${seconds}_${milliseconds}${file}`

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
