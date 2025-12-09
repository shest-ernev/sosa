import { Module } from '@nestjs/common'

import { SignUpModule } from './signUp'
import { SignInModule } from './signIn'

@Module({
  imports: [SignUpModule, SignInModule],
})
export class AppModule {}
