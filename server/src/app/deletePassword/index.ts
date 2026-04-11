import { Module } from '@nestjs/common'

import { dbModule, entitiesModule, jwtModule } from '@/shared/modules'
import { CodeService } from '@/shared/services'

import { DeletePasswordController } from './module/index.controller'
import { DeletePasswordService } from './module/index.service'

@Module({
  imports: [dbModule(), entitiesModule(), jwtModule()],
  providers: [DeletePasswordService, CodeService],
  controllers: [DeletePasswordController],
})
export class DeletePasswordModule {}
