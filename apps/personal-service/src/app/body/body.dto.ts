import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class CreateBodyDto {
  @ApiProperty()
  @IsNotEmpty()
  weight: number;
  @ApiProperty()
  @IsNotEmpty()
  height: number;
  @ApiProperty()
  @IsNotEmpty()
  birthDate: Date;
  @ApiProperty()
  @IsNotEmpty()
  userId: string;
}

export class UpdateBodyDto {
  @ApiProperty()
  weight: number;
  @ApiProperty()
  height: number;
  @ApiProperty()
  birthDate: Date;
  @ApiProperty()
  id: string;
}

