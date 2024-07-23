import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TokenUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly token: string;
}
