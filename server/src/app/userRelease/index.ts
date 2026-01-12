import { Module } from '@nestjs/common'

import { dbModule, entitiesModule } from '@/shared/modules'

import { UserReleaseService } from './module/userRelease.service'
import { UserReleaseController } from './module/userRelease.controller'

@Module({
  imports: [dbModule(), entitiesModule()],
  providers: [UserReleaseService],
  controllers: [UserReleaseController],
})
export class ReleaseModule {}
