import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateWaterDto {
    @ApiProperty()
    @IsNotEmpty()
    waterIntake: number;
    @ApiProperty()
    @IsNotEmpty()
    userId: string;
  }

export class CreateFoodDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    calories: number;
    @ApiProperty()
    @IsNotEmpty()
    userId: string;
  }

  export class CreateSleepDto {
    @ApiProperty()
    @IsNotEmpty()
    sleepTime: Date;
    @ApiProperty()
    @IsNotEmpty()
    wakeTime: Date;
    @ApiProperty()
    @IsNotEmpty()
    userId: string;
  }
  
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
  
  