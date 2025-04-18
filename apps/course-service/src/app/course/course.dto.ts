import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;
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
  image: string;
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
  title: string;
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
  image: string;
  @IsNotEmpty()
  @ApiProperty()
  teacherId: string;
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

export class CreateCourseDetailDto {
  @IsNotEmpty()
  @ApiProperty()
  courseId: string;
  @IsNotEmpty()
  @ApiProperty()
  title: string;
  @IsNotEmpty()
  @ApiProperty()
  detail: string;
  @IsNotEmpty()
  @ApiProperty()
  image: string;
  @IsNotEmpty()
  @ApiProperty()
  warning: string;
  @IsNotEmpty()
  @ApiProperty()
  needsInfo: string;
  @IsNotEmpty()
  @ApiProperty()
  teacherId: string;
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
  title: string;
  @IsNotEmpty()
  @ApiProperty()
  detail: string;
  @IsNotEmpty()
  @ApiProperty()
  image: string;
  @IsNotEmpty()
  @ApiProperty()
  warning: string;
  @IsNotEmpty()
  @ApiProperty()
  needsInfo: string;
  @IsNotEmpty()
  @ApiProperty()
  teacherId: string;
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