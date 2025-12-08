import { ConfigModule } from '@nestjs/config'

ConfigModule.forRoot()

export const jwt = {
  secret: process.env.JWT_SECRET,
} as const
