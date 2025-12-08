import { NestFactory } from '@nestjs/core'
import { join } from 'path'
import * as express from 'express'

import { AppModule } from './app'
import { server } from './shared/config'
import { exceptionsFilter, validationErrors, swagger } from './shared/lib'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({ origin: true })
  app.setGlobalPrefix(server.globalPrefix)
  app.useGlobalPipes(validationErrors)
  app.useGlobalFilters(exceptionsFilter)
  app.use(server.globalPrefix, express.static(join(__dirname, '..', 'public')))
  app.use(express.json())

  swagger(app)

  await app.listen(server.port)
}

bootstrap()
  .then(() => console.log(`Server started on ${server.link}`))
  .catch((err) => console.log('Server error', err))
