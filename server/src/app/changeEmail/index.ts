import { Module } from '@nestjs/common'

import { dbModule, entitiesModule, jwtModule } from '@/shared/modules'
import { CodeService } from '@/shared/services'

import { ChangeEmailController } from './module/index.controller'
import { ChangeEmailService } from './module/index.service'

@Module({
  imports: [dbModule(), entitiesModule(), jwtModule()],
  providers: [ChangeEmailService, CodeService],
  controllers: [ChangeEmailController],
})
export class ChangeEmailModule {}
