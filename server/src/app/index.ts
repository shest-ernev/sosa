import { Module } from '@nestjs/common'

import { SignUpModule } from './signUp'
import { SignInModule } from './signIn'
import { AuthModule } from './auth'

@Module({
  imports: [SignUpModule, SignInModule, AuthModule],
})
export class AppModule {}
