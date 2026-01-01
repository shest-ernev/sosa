import { TypeOrmModule } from '@nestjs/typeorm'

import {
  UserEntity,
  UserSettingsEntity,
  ReleaseEntity,
  GenreEntity,
  CommentEntity,
  NotificationEntity,
  FavoritesEntity,
  ReleaseGenresEntity,
} from '@/database/entities'

export const entitiesModule = () => {
  return TypeOrmModule.forFeature([
    UserEntity,
    UserSettingsEntity,
    ReleaseEntity,
    GenreEntity,
    CommentEntity,
    NotificationEntity,
    FavoritesEntity,
    ReleaseGenresEntity,
  ])
}
