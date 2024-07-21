import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

import { FoodController } from './food.controller';
import { FoodService } from './food.service';

@Module({
  imports: [],
  controllers: [FoodController],
  providers: [FoodService, PrismaService],
})
export class CourseModule {}
