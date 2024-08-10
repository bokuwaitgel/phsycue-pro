import { Body, Controller, Get, Post, Headers, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';

import { AuthService } from '../auth/auth.service';
import { CourseService } from './course.service';

import {
    enrollCourseDto
} from './course.dtos';


@ApiTags('course')
@Controller('course')
export class CourseController {
    constructor(
        private readonly authService: AuthService,
        private readonly contentService: CourseService
    ) {}
    
    @Get('course')
    async getCourse(){
        return this.contentService.getCourses();
    }

    @Get('course/:id')
    async getCourseById(@Param('id') id: string){
        return this.contentService.getCourseById(id);
    }

    @Post('enroll')
    @ApiBearerAuth()
    @ApiBody({ type: enrollCourseDto })
    async enrollCourse(@Body() data: enrollCourseDto, @Headers('Authorization') auth: string){
        const token = auth
        const isValid = await this.authService.validateUserToken(token);
        if (!isValid) {
            return {
                status: false,
                type: 'error',
                code: 401,
                message: 'Invalid Token',
            };
        } else if (isValid.success !== 'true') {
            return isValid;
        }
        return this.contentService.enrollCourse(data);
    }

    @Get('user/course/:id')
    @ApiBearerAuth()
    async getEnrolledCourse(@Param('id') id: string, @Headers('Authorization') auth: string){
        const token = auth
        const isValid = await this.authService.validateUserToken(token);
        if (!isValid) {
            return {
                status: false,
                type: 'error',
                code: 401,
                message: 'Invalid Token',
            };
        } else if (isValid.success !== 'true') {
            return isValid;
        }
        return this.contentService.getUserCourses(id);
    }

    @Get('user/schedule/:id')
    @ApiBearerAuth()
    async getUserSchedule(@Param('id') id: string, @Headers('Authorization') auth: string){
        const token = auth
        const isValid = await this.authService.validateUserToken(token);
        if (!isValid) {
            return {
                status: false,
                type: 'error',
                code: 401,
                message: 'Invalid Token',
            };
        }else if (isValid.success !== 'true') {
            return isValid;
        }
        return this.contentService.getUserSchedule(id);
    }
    
}
