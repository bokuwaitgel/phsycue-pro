import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('cousre-service')
@Controller('cousre-service')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get data' })
  @ApiResponse({ status: 200, description: 'Data' })
  getData() {
    return this.appService.getData();
  }
}
