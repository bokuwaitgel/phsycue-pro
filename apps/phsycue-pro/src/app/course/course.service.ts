import { Injectable,Inject, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import {
    enrollCourseDto
} from './course.dtos';

@Injectable()
export class CourseService {
    constructor(
        private configService: ConfigService,
    ) {}
    
    async getCourses() {
        const url = `${this.configService.get('COURSE_SERVICE_URL')}${this.configService.get('COURSE_SERVICE_PREFIX')}/user/getCourses`

        const res  = await axios.get(url,{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }

    async getCourseById(id: string)
    {
        const url = `${this.configService.get('COURSE_SERVICE_URL')}${this.configService.get('COURSE_SERVICE_PREFIX')}/user/getCourse/${id}`

        const res  = await axios.get(url,{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }

    async enrollCourse(data: enrollCourseDto)
    {
        const url = `${this.configService.get('COURSE_SERVICE_URL')}${this.configService.get('COURSE_SERVICE_PREFIX')}/user/enrollCourse`

        const res  = await axios.post(url,{
            userId: data.userId,
            courseId: data.courseId
        },{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }

    async getUserCourses(userId: string)
    {
        const url = `${this.configService.get('COURSE_SERVICE_URL')}${this.configService.get('COURSE_SERVICE_PREFIX')}/user/getUserCourses/${userId}`

        const res  = await axios.get(url,{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }

    async getUserSchedule(userId: string)
    {
        const url = `${this.configService.get('COURSE_SERVICE_URL')}${this.configService.get('COURSE_SERVICE_PREFIX')}/user/getUserSchedule/${userId}`

        const res  = await axios.get(url,{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }

}

