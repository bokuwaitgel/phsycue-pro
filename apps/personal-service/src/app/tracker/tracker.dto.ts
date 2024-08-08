import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class StartTrackerDto {
  @ApiProperty()
  @IsNotEmpty()
  UserId: string;

  @ApiProperty()
  @IsNotEmpty()
  courseId: string;
}

export class EndTrackerDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}