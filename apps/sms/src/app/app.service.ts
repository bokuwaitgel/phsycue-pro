import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import {ConfigService} from '@nestjs/config';
import { SendSmsDto } from './dto/send-sms.dto';

@Injectable()
export class SmsService {
  private twilioClient: Twilio;

  constructor(private configService: ConfigService) {
    this.twilioClient = new Twilio(
      this.configService.get('TWILIO_ACCOUNT_SID'),
      this.configService.get('TWILIO_AUTH_TOKEN'),
    );
  }

  async sendSms(sendSmsDto: SendSmsDto) {
    const { to, body } = sendSmsDto;
    console.log('to', to);
    console.log('body', body);

    return this.twilioClient.messages.create({
      body,
      to: to,
      from: this.configService.get('TWILIO_PHONE_NUMBER'),
    });
  }
}