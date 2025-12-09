import { Module } from '@nestjs/common'

import { jwtModule, entitiesModule, dbModule } from '@/shared/modules'

import { AuthController } from './module/auth.controller'
import { AuthService } from './module/auth.service'

@Module({
  imports: [jwtModule(), entitiesModule(), dbModule()],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
