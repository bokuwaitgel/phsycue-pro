import { Module } from '@nestjs/common';

import { PersonalController } from './personal.controller';
import { PersonalService } from './personal.service';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    
  ],
  controllers: [PersonalController],
  providers: [PersonalService, AuthService],
})
export class AppModule {}
