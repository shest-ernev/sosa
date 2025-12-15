import { ApiProperty } from '@nestjs/swagger'

export class AuthRefreshData {
  @ApiProperty()
  access_token: string
}
