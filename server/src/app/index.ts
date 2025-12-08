import { Module } from '@nestjs/common'

import { SignUpModule } from './signUp'

@Module({
  imports: [SignUpModule],
})
export class AppModule {}
