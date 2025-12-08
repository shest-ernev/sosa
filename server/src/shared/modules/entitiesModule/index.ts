import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity, UserSettingsEntity } from '@/database/entities'

export const entitiesModule = () => {
  return TypeOrmModule.forFeature([UserEntity, UserSettingsEntity])
}
