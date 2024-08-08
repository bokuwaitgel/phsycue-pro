import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

import { TrackerController } from './tracker.controller';
import { TrackerService } from './tracker.service';

@Module({
  imports: [],
  controllers: [TrackerController],
  providers: [TrackerService, PrismaService],
})
export class CourseModule {}
