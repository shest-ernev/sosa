import { ConfigModule } from '@nestjs/config'

ConfigModule.forRoot()

export const db = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_PASSWORD,
} as const
