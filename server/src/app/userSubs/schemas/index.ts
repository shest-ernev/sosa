import { ApiProperty } from '@nestjs/swagger'

export class UserSubSubscribeBody {
  @ApiProperty()
  profile: string
}

export class UserSubUnsubscribeBody {
  @ApiProperty()
  profile: string
}
