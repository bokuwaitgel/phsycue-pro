import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

import { BodyController } from './body.controller';
import { BodyService } from './body.service';

@Module({
  imports: [],
  controllers: [BodyController],
  providers: [BodyService, PrismaService],
})
export class CourseModule {}
