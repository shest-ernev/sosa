import { Module } from '@nestjs/common'

import { dbModule, entitiesModule } from '@/shared/modules'

import { UserSubsController } from './module/userSubs.controller'
import { UserSubsService } from './module/userSubs.service'

@Module({
  imports: [dbModule(), entitiesModule()],
  controllers: [UserSubsController],
  providers: [UserSubsService],
})
export class UserSubsModule {}
