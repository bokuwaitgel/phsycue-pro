import { Body, Controller, Delete, Get, Post, Put, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CourseService } from './course.service';

//dtos
import { 
  CreateCourseDto,
  UpdateCourseDto,
  deleteCourseDto,
  CreateCourseDetailDto,
  UpdateCourseDetailDto,
  deleteCourseDetailDto,
} from './course.dto';

@ApiTags('course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('getCourses/:teacherId')
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Data' })
  getCourses(@Param('teacherId') teacherId: string){
    return this.courseService.getCourses(teacherId);
  }

  @Get('getCourseById/:courseid')
  @ApiOperation({ summary: 'Get course by id' })
  @ApiResponse({ status: 200, description: 'Data' })
  getCourseById(@Param('courseid') courseid: string){ 
    return this.courseService.getCourseById({id: courseid});
  }

  @Post('createCourse/:teacherId')
  @ApiOperation({ summary: 'Create course' })
  @ApiResponse({ status: 200, description: 'Data' })
  public async createCourse(@Body() data: CreateCourseDto) {
    return this.courseService.createCourse(data);
  }

  @Put('updateCourse')
  @ApiOperation({ summary: 'Update course' })
  @ApiResponse({ status: 200, description: 'Data' })
  public async updateCourse(@Body() data: UpdateCourseDto) {
    return this.courseService.updateCourse(data);
  }

  @Delete('deleteCourse')
  @ApiOperation({ summary: 'Delete course' })
  @ApiResponse({ status: 200, description: 'Data' })
  public async deleteCourse(@Body() data: deleteCourseDto) {
    return this.courseService.deleteCourse(data);
  }

  @Get('getCourseDetails')
  @ApiOperation({ summary: 'Get all course details' })
  @ApiResponse({ status: 200, description: 'Data' })
  getCourseDetails() {
    return this.courseService.getCourseDetails();
  }

  @Get('getCourseDetailById/:coursedetailid')
  @ApiOperation({ summary: 'Get course detail by id' })
  @ApiResponse({ status: 200, description: 'Data' })
  getCourseDetailById(@Param('coursedetailid') coursedetailid: string){
    return this.courseService.getCourseDetailById({id: coursedetailid});
  }

  @Post('createCourseDetail')
  @ApiOperation({ summary: 'Create course detail' })
  @ApiResponse({ status: 200, description: 'Data' })
  public async createCourseDetail(@Body() data: CreateCourseDetailDto) {
    return this.courseService.createCourseDetail(data);
  }


  @Put('updateCourseDetail')
  @ApiOperation({ summary: 'Update course detail' })
  @ApiResponse({ status: 200, description: 'Data' })
  public async updateCourseDetail(@Body() data: UpdateCourseDetailDto) {
    return this.courseService.updateCourseDetail(data);
  }

  @Delete('deleteCourseDetail')
  @ApiOperation({ summary: 'Delete course detail' })
  @ApiResponse({ status: 200, description: 'Data' })
  public async deleteCourseDetail(@Body() data: deleteCourseDetailDto) {
    return this.courseService.deleteCourseDetail(data);
  }
  
}
