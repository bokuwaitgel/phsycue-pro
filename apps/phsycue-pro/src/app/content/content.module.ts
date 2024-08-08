import { Module } from '@nestjs/common';

import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    
  ],
  controllers: [ContentController],
  providers: [ContentService, AuthService],
})
export class AppModule {}
