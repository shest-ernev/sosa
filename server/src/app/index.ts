import { Module } from '@nestjs/common'

import { SignUpModule } from './signUp'
import { SignInModule } from './signIn'
import { AuthModule } from './auth'
import { UserModule } from './user'
import { UserSettingsModule } from './userSettings'

@Module({
  imports: [
    SignUpModule,
    SignInModule,
    AuthModule,
    UserModule,
    UserSettingsModule,
  ],
})
export class AppModule {}
