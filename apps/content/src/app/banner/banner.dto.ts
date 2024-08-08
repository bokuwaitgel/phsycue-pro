import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBannerDto { 
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  imageUrl: string;
  @ApiProperty()
  @IsNotEmpty()
  type: string;
}

export class UpdateBannerDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  imageUrl: string;
  @ApiProperty()
  @IsNotEmpty()
  type: string;
  @ApiProperty()
  @IsNotEmpty()
  isActive: boolean;
}