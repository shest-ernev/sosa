import { Module } from '@nestjs/common'

import { SignUpModule } from './signUp'
import { SignInModule } from './signIn'
import { AuthModule } from './auth'
import { UserModule } from './user'
import { UserSettingsModule } from './userSettings'
import { ReleaseModule } from './userRelease'
import { FavoritesModule } from './favorites'
import { ChangePasswordModule } from './changePassword'
import { DeletePasswordModule } from './deletePassword'

@Module({
  imports: [
    SignUpModule,
    SignInModule,
    AuthModule,
    UserModule,
    UserSettingsModule,
    ReleaseModule,
    FavoritesModule,
    ChangePasswordModule,
    DeletePasswordModule,
  ],
})
export class AppModule {}
