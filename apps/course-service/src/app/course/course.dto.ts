import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @ApiProperty()
  img: string;
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsNotEmpty()
  @ApiProperty()
  price: number;
  @IsNotEmpty()
  @ApiProperty()
  type: string;
  @IsNotEmpty()
  @ApiProperty()
  teacherId: string;
}


export class UpdateCourseDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
  @IsNotEmpty()
  @ApiProperty()
  img: string;
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsNotEmpty()
  @ApiProperty()
  price: number;
  @IsNotEmpty()
  @ApiProperty()
  type: string;
}

export class deleteCourseDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}


export class getCourseByIdDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}


export class AddExerciseToCourseDto {
  @IsNotEmpty()
  @ApiProperty()
  exerciseId: string;
  @IsNotEmpty()
  @ApiProperty()
  courseId: string;
}

export class CreateCourseDetailDto {
  @IsNotEmpty()
  @ApiProperty()
  courseId: string;
  @IsNotEmpty()
  @ApiProperty()  
  courseDescription: string;
}

export class UpdateCourseDetailDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
  @IsNotEmpty()
  @ApiProperty()
  courseId: string;
  @IsNotEmpty()
  @ApiProperty()
  courseDescription: string;
}

export class deleteCourseDetailDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}

export class getCourseDetailByIdDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}