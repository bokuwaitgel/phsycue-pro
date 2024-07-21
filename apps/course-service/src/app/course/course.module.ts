import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  imports: [],
  controllers: [CourseController],
  providers: [CourseService, PrismaService],
})
export class CourseModule {}
