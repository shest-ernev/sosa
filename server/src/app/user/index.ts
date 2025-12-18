import { Module } from '@nestjs/common'

import { dbModule, entitiesModule } from '@/shared/modules'

import { UserController } from './module/user.controller'
import { UserService } from './module/user.service'

@Module({
  imports: [dbModule(), entitiesModule()],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
