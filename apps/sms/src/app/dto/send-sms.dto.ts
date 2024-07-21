import { ApiProperty } from '@nestjs/swagger';

export class SendSmsDto {
  @ApiProperty({ example: '+97695625171', description: 'Recipient phone number' })
  to: string;

  @ApiProperty({ example: 'Hello from NestJS!', description: 'SMS content' })
  body: string;
}
