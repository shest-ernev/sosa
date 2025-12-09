import { Module } from '@nestjs/common'

import { jwtModule, entitiesModule, dbModule } from '@/shared/modules'
import { CodeService } from '@/shared/services'

import { SignInController } from './module/signIn.controller'
import { SignInService } from './module/signIn.service'

@Module({
  imports: [jwtModule(), entitiesModule(), dbModule()],
  controllers: [SignInController],
  providers: [CodeService, SignInService],
})
export class SignInModule {}
