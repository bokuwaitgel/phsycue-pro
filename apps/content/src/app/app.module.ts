import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma.service';

import  config from "./config"

import { AppController } from './app.controller';
import { BannerController } from './banner/banner.controller';
import { AppService } from './app.service';
import { BannerService } from './banner/banner.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.content.env', 
      load: [config],
    }),
  ],
  controllers: [AppController, BannerController],
  providers: [AppService, BannerService, PrismaService],
})
export class AppModule {}
