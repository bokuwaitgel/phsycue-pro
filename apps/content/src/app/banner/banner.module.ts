import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';

@Module({
  imports: [],
  controllers: [BannerController],
  providers: [BannerService, PrismaService],
})
export class CourseModule {}
