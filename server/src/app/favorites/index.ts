import { Module } from '@nestjs/common'

import { dbModule, entitiesModule } from '@/shared/modules'

import { FavoritesService } from './module/favorites.service'
import { FavoritesController } from './module/favorites.controller'

@Module({
  imports: [dbModule(), entitiesModule()],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
