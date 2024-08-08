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

  @Get('getUserCourses/:userid')
  @ApiOperation({ summary: 'Get user courses' })
  @ApiResponse({ status: 200, description: 'Data' })
  getUserCourses(@Param('userid') userId: string){
    return this.userService.getUserCourses({userId});
  }

  @Get('getCourses')
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Data' })
  getCourses(){
    return this.userService.getCourseActive();
  }

  @Get('getCourse/:courseid')
  @ApiOperation({ summary: 'Get course by id' })
  @ApiResponse({ status: 200, description: 'Data' })
  getCourse(@Param('courseid') courseId: string){
    return this.userService.getCourseDetail(courseId);
  }


  @Get('getUserSchedule/:userid')
  @ApiOperation({ summary: 'Get user schedule' })
  @ApiResponse({ status: 200, description: 'Data' })
  getUserSchedule(@Param('userid') userId: string){
    return this.userService.getUserSchedule({userId});
  }
}