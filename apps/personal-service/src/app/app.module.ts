import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from '../prisma.service';

import  config from "./config"

import { AppController } from './app.controller';
import { BodyController } from './body/body.controller';
import { FoodController } from './food/food.controller';
import { WaterController } from './water/water.controller';
import { SleepController } from './sleep/sleep.controller';
import { TrackerController } from './tracker/tracker.controller';

import { AppService } from './app.service';
import { BodyService } from './body/body.service';
import { FoodService } from './food/food.service';
import { WaterService } from './water/water.service';
import { SleepService } from './sleep/sleep.service';
import { TrackerService } from './tracker/tracker.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.personal.env',
      load: [config],
    }),
    ScheduleModule.forRoot()
  ],
  controllers: [AppController, BodyController, FoodController, WaterController, SleepController, TrackerController],
  providers: [AppService, BodyService, FoodService, WaterService, SleepService, TrackerService, PrismaService],
})
export class AppModule {}
