import { TypeOrmModule } from '@nestjs/typeorm'

import { db } from '@/shared/config'

import {
  UserEntity,
  UserSettingsEntity,
  ReleaseEntity,
  GenreEntity,
  CommentEntity,
  NotificationEntity,
  FavoritesEntity,
} from '@/database/entities'

export const dbModule = () => {
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    database: db.name,
    synchronize: true,
    entities: [
      UserEntity,
      UserSettingsEntity,
      ReleaseEntity,
      GenreEntity,
      CommentEntity,
      NotificationEntity,
      FavoritesEntity,
    ],
    logging: true,
  })
}
