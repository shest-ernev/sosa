import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const config = new DocumentBuilder()
  .setTitle('Sosa')
  .setDescription('Music service')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

export const swagger = (app: INestApplication) => {
  const document = SwaggerModule.createDocument(app, config)

  return SwaggerModule.setup('api/swagger', app, document)
}
