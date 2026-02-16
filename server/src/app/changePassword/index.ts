import { Module } from '@nestjs/common'

import { dbModule, entitiesModule, jwtModule } from '@/shared/modules'
import { CodeService } from '@/shared/services'

import { ChangePasswordService } from './module/index.service'
import { ChangePasswordController } from './module/index.controller'

@Module({
  imports: [dbModule(), entitiesModule(), jwtModule()],
  providers: [ChangePasswordService, CodeService],
  controllers: [ChangePasswordController],
})
export class ChangePasswordModule {}
