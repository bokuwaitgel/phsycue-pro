import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreatePersonalDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;
}
import { AppService } from './app.service';

@Controller()

@ApiTags('personel')
@Controller('personel')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create data' })
  @ApiResponse({ status: 200, description: 'Data' })
  public createData(@Body() data: CreatePersonalDto) {
    return this.appService.createPersonal(data);
  }

  @Post('get')
  @ApiOperation({ summary: 'Get data' })
  @ApiResponse({ status: 200, description: 'Data' })
  public getData(@Body() data: CreatePersonalDto) {
    return this.appService.getPersonal(data.userId);
  }
}
