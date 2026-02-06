import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'

export const swagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Sosa')
    .setDescription('Music service')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)

  const theme = new SwaggerTheme()

  return SwaggerModule.setup('api/swagger', app, document, {
    customSiteTitle: 'SOSA API',
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
  })
}
