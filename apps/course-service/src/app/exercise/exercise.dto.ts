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
  image: string;
  @IsNotEmpty()
  @ApiProperty()
  video: string;
  @IsNotEmpty()
  @ApiProperty()
  type: string;
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
  @IsNotEmpty()
  @ApiProperty()
  image: string;
  @IsNotEmpty()
  @ApiProperty()
  video: string;
  @IsNotEmpty()
  @ApiProperty()
  type: string;
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

export class addExerciseToCourseDto {
  @IsNotEmpty()
  @ApiProperty()
  courseId: string;
  @IsNotEmpty()
  @ApiProperty()
  exerciseId: string;
}
