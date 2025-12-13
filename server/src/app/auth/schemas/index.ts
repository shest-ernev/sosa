import { ApiProperty, PickType } from '@nestjs/swagger'

import { UserSchema } from '@/shared/schemas'
import { UserSettingsEntity } from '@/database/entities'

class GetAuthDataSettings extends PickType(UserSettingsEntity, ['theme']) {}

export class GetAuthData {
  @ApiProperty()
  user: UserSchema

  @ApiProperty()
  settings: GetAuthDataSettings
}

export class AuthRefreshData {
  @ApiProperty()
  access_token: string
}
