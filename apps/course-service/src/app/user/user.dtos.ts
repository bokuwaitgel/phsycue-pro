import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class enrollCourseDto {
    @ApiProperty()
    @IsNotEmpty()
    courseId: string
    @ApiProperty()
    @IsNotEmpty()
    userId: string
}


export class getUserCoursesDto {
    @ApiProperty()
    @IsNotEmpty()
    userId: string
}

