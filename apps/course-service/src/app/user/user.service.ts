import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

//dtos
import {
  enrollCourseDto,
  getUserCoursesDto,
} from './user.dtos';


@Injectable()
export class UserService {
  
  constructor(private prisma: PrismaService) {}

  async enrollCourse(data: enrollCourseDto) : Promise<unknown> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: data.userId
      }
    });

    if(!findUser)
    {
      return {
        status: false,
        type: 'error',
        message: 'User not found',
        code : HttpStatus.NOT_FOUND,
      }
    }

    const findCourse = await this.prisma.courses.findUnique({
      where: {
        id: data.courseId
      }
    });

    if(!findCourse)
    {
      return {
        status: false,
        type: 'error',
        message: 'Course not found',
        code : HttpStatus.NOT_FOUND,
      }
    }

    const findTeacher = await this.prisma.teacher.findUnique({
      where: {
        id: findCourse.teacherId
      }
    });

    if(!findTeacher)
    {
      return {
        status: false,
        type: 'error',
        message: 'Teacher not found',
        code : HttpStatus.NOT_FOUND,
      }
    }

    const findSchedule = await this.prisma.courseSchedule.findUnique({
      where: {
        id: data.scheduleId
      }
    });

    if(!findSchedule)
    {
      return {
        status: false,
        type: 'error',
        message: 'Schedule not found',
        code : HttpStatus.NOT_FOUND,
      }
    }

    const res = await this.prisma.courseEnrollment.create({
      data: {
        course: {
          connect: {
            id: data.courseId
          }
        },
        user: {
          connect: {
            id: data.userId
          }
        },
        courseSchedule: {
          connect: {
            id: data.scheduleId
          }
        },
        teacher: {
          connect: {
            id: findTeacher.id
          }
        }
      }
    });

    return {
      status: true,
      type: 'success',
      message: 'Course enrolled',
      code : HttpStatus.OK,
      data: res
    }
  }

  async getUserCourses(data: getUserCoursesDto) : Promise<unknown> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: data.userId
      }
    });

    if(!findUser)
    {
      return {
        status: false,
        type: 'error',
        message: 'User not found',
        code : HttpStatus.NOT_FOUND,
      }
    }

    const res = await this.prisma.courseEnrollment.findMany({
      where: {
        userId: data.userId
      }
    });

    return {
      status: true,
      type: 'success',
      message: 'Courses fetched',
      code : HttpStatus.OK,
      data: res
    }
  }

}