import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateWaterDto {
    @ApiProperty()
    @IsNotEmpty()
    waterIntake: number;
  }

export class CreateFoodDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    calories: number;

  }

  export class CreateSleepDto {
    @ApiProperty()
    @IsNotEmpty()
    sleepTime: Date;
    @ApiProperty()
    @IsNotEmpty()
    wakeTime: Date;
  }
  
  export class StartTrackerDto {  
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
  
  