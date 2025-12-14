import { Module } from '@nestjs/common'

import { dbModule, entitiesModule } from '@/shared/modules'

import { UserSettingsService } from './module/userSettings.service'
import { UserSettingsController } from './module/userSettings.controller'

@Module({
  imports: [dbModule(), entitiesModule()],
  providers: [UserSettingsService],
  controllers: [UserSettingsController],
})
export class UserSettingsModule {}
