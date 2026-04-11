import { UserSettingsEntity } from '@/database/entities'
import { ApiProperty, PickType } from '@nestjs/swagger'

export class AuthRefreshData {
  @ApiProperty()
  access_token!: string
}

export class GetAuthData extends PickType(UserSettingsEntity, [
  'lang',
  'theme',
]) {}
