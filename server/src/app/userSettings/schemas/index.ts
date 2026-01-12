import { OmitType, PartialType } from '@nestjs/swagger'

import { UserSettingsEntity } from '@/database/entities'

export class EditUserSettingsBody extends PartialType(
  OmitType(UserSettingsEntity, ['id', 'createdAt', 'updateAt'])
) {}

export class GetUserSettings extends UserSettingsEntity {}
