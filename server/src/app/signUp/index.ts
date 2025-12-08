import { Module } from '@nestjs/common'

import { jwtModule, dbModule, entitiesModule } from '@/shared/modules'
import { CodeService } from '@/shared/services'

import { SignUpContorller } from './module/signUp.controller'
import { SignUpService } from './module/signUp.service'

@Module({
  imports: [jwtModule(), dbModule(), entitiesModule()],
  controllers: [SignUpContorller],
  providers: [SignUpService, CodeService],
})
export class SignUpModule {}
