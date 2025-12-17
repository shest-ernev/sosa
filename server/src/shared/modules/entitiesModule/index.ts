import { TypeOrmModule } from '@nestjs/typeorm'

import {
  UserEntity,
  UserSettingsEntity,
  UserSubsEntity,
  ReleaseEntity,
  GenreEntity,
  CommentEntity,
  NotificationEntity,
} from '@/database/entities'

export const entitiesModule = () => {
  return TypeOrmModule.forFeature([
    UserEntity,
    UserSettingsEntity,
    UserSubsEntity,
    ReleaseEntity,
    GenreEntity,
    CommentEntity,
    NotificationEntity,
  ])
}
