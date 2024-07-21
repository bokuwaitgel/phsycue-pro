import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

//dtos
import {
  CreateSchedulerDto,
  deleteSchedulerDto
} from './scheduler.dtos';


@Injectable()
export class SchedulerService {
  
  constructor(private prisma: PrismaService) {}

  async createScheduler(courseid,  data: CreateSchedulerDto) {
    try {
      const findCourse = await this.prisma.courses.findUnique({
        where: { id: courseid }
      });
      if (!findCourse) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Course not found'
        };
      }
      const scheduler = await this.prisma.courseSchedule.create({
        data: {
          ...data,
          course: {
            connect: {
              id: courseid
            }
          }
        }
      });
      return {
        status: HttpStatus.OK,
        message: 'Scheduler created successfully',
        data: scheduler
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error creating scheduler',
        error: error.message
      };
    }
  }

  async getScheduler(courseid: string) {
    try {
      const findCourse = await this.prisma.courses.findUnique({
        where: { id: courseid }
      });
      if (!findCourse) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Course not found'
        };
      }
      const scheduler = await this.prisma.courseSchedule.findMany({
        where: {
          courseId: courseid
        }
      });
      return {
        status: HttpStatus.OK,
        message: 'Scheduler fetched successfully',
        data: scheduler
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error fetching scheduler',
        error: error.message
      };
    }
  }


  async deleteScheduler(data: deleteSchedulerDto) {
    try {
      const findScheduler = await this.prisma.courseSchedule.findUnique({
        where: { id: data.id }
      });
      if (!findScheduler) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Scheduler not found'
        };
      }
      await this.prisma.courseSchedule.delete({
        where: {
          id: data.id
        }
      });
      return {
        status: HttpStatus.OK,
        message: 'Scheduler deleted successfully'
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error deleting scheduler',
        error: error.message
      };
    }
  }
}