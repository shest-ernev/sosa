import { TypeOrmModule } from '@nestjs/typeorm'

import {
  UserEntity,
  UserSettingsEntity,
  UserSubsEntity,
} from '@/database/entities'

export const entitiesModule = () => {
  return TypeOrmModule.forFeature([
    UserEntity,
    UserSettingsEntity,
    UserSubsEntity,
  ])
}
