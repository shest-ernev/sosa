import { ConfigModule } from '@nestjs/config'

ConfigModule.forRoot()

export const transporter = {
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
} as const
