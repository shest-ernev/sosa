import { ApiProperty } from '@nestjs/swagger'

export class UploadFileBody {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: any
}
