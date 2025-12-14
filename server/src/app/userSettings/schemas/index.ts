import { OmitType, PartialType } from '@nestjs/swagger'

import { UserSettingsEntity } from '@/database/entities'

export class GetUserSettingsData extends OmitType(UserSettingsEntity, [
  'user',
  'userId',
]) {}

export class EditUserSettingsBody extends PartialType(
  OmitType(UserSettingsEntity, [
    'id',
    'user',
    'userId',
    'createdAt',
    'updateAt',
  ])
) {}
