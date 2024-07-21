import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [],
  controllers: [SchedulerController],
  providers: [SchedulerService, PrismaService],
})
export class SchedulerModule {}
