import { Module } from '@nestjs/common';

import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    
  ],
  controllers: [CourseController],
  providers: [CourseService, AuthService],
})
export class AppModule {}
