import { Module } from '@nestjs/common'

import { SignUpModule } from './signUp'
import { SignInModule } from './signIn'
import { AuthModule } from './auth'
import { UserModule } from './user'
import { UserSettingsModule } from './userSettings'
import { ReleaseModule } from './release'
import { FavoritesModule } from './favorites'

@Module({
  imports: [
    SignUpModule,
    SignInModule,
    AuthModule,
    UserModule,
    UserSettingsModule,
    ReleaseModule,
    FavoritesModule,
  ],
})
export class AppModule {}
