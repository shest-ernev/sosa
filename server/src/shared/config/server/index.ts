import { ConfigModule } from '@nestjs/config'

ConfigModule.forRoot()

const globalPrefix = '/api'

export const server = {
  port: Number(process.env.PORT),
  globalPrefix,
  link: `http://localhost:${process.env.PORT}${globalPrefix}`,
} as const
