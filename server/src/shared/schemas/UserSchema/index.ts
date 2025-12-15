import { OmitType } from '@nestjs/swagger'

import { UserEntity } from '@/database/entities'

export class UserSchema extends OmitType(UserEntity, [
  'refreshToken',
  'code',
  'settingsId',
  'isActive',
]) {}
