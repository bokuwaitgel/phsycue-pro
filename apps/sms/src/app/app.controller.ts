import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SmsService } from './app.service';
import { SendSmsDto } from './dto/send-sms.dto';

@ApiTags('SMS')
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send an SMS' })
  @ApiResponse({ status: 200, description: 'SMS sent successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async sendSms(@Body() sendSmsDto: SendSmsDto) {
    return this.smsService.sendSms(sendSmsDto);
  }
}