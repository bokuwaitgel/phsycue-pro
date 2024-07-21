import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {ConfigService} from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AuthModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);

  const port = configService.get('PORT')

  const config = new DocumentBuilder()
    .setTitle('Phsycue Pro '+configService.get('SERVICE_NAME')+' API')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth({
      description: 'Default JWT Authorization',
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .addTag(configService.get('SERVICE_NAME'))
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, '0.0.0.0');
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
