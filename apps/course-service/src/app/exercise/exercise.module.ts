import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';

@Module({
  imports: [],
  controllers: [ExerciseController],
  providers: [ExerciseService, PrismaService],
})
export class TodoModule {}
