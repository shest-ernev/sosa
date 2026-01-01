import { Module } from '@nestjs/common'

import { dbModule, entitiesModule } from '@/shared/modules'

import { ReleaseService } from './module/release.service'
import { ReleaseController } from './module/release.controller'

@Module({
  imports: [dbModule(), entitiesModule()],
  providers: [ReleaseService],
  controllers: [ReleaseController],
})
export class ReleaseModule {}
