import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller()

@ApiTags('personel')
@Controller('personel')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create data' })
  @ApiResponse({ status: 200, description: 'Data' })
  public createData(@Body() data: {
    userId: string
  }) {
    return this.appService.createPersonal(data);
  }
}
