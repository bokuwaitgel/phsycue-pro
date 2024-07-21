import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateExerciseDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsNotEmpty()
  @ApiProperty()
  teacherId: string;
}

export class UpdateExerciseDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}

export class deleteExerciseDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}


export class getExerciseByIdDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}

