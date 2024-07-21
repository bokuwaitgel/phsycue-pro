/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {ConfigService} from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { SmsModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(SmsModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);

  const port = configService.get('PORT');

  const config = new DocumentBuilder()
    .setTitle('Phsycue Pro SMS API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('physicue-pro-sms')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, '0.0.0.0');
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
