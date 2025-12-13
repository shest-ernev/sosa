import { Module } from '@nestjs/common'

import { SignUpModule } from './signUp'
import { SignInModule } from './signIn'
import { AuthModule } from './auth'
import { UserModule } from './user'

@Module({
  imports: [SignUpModule, SignInModule, AuthModule, UserModule],
})
export class AppModule {}
