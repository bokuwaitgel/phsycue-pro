import { Body, Controller, Get, Post,  Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UserService } from './user.service';

//dtos
import { 
  enrollCourseDto
} from './user.dtos';


@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post('enrollCourse')
  @ApiOperation({ summary: 'Enroll course' })
  @ApiResponse({ status: 200, description: 'Data' })
  public async enrollCourse(@Body() data: enrollCourseDto) {
    return this.userService.enrollCourse(data);
  }

  @Get('getUserCourses')
  @ApiOperation({ summary: 'Get user courses' })
  @ApiResponse({ status: 200, description: 'Data' })
  getUserCourses(@Param('userid') userId: string){
    return this.userService.getUserCourses({userId});
  }



}