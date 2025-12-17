import { Module } from '@nestjs/common'

import { SignUpModule } from './signUp'
import { SignInModule } from './signIn'
import { AuthModule } from './auth'
import { UserModule } from './user'
import { UserSettingsModule } from './userSettings'
import { UserSubsModule } from './userSubs'

@Module({
  imports: [
    SignUpModule,
    SignInModule,
    AuthModule,
    UserModule,
    UserSettingsModule,
    UserSubsModule,
  ],
})
export class AppModule {}
