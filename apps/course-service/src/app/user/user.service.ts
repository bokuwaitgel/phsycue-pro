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

    const userCourses = await this.prisma.courseEnrollment.findMany({
      where: {
        userId: data.userId
      }
    });

    const res = await Promise.all(userCourses.map(async (course) => {
      const courseData = await this.prisma.courses.findUnique({
        where: {
          id: course.courseId
        }
      });

      const teacherData = await this.prisma.teacher.findUnique({
        where: {
          id: course.teacherId
        }
      });

      return {
        course: courseData,
        teacher: teacherData
      }
    }));

    return {
      status: true,
      type: 'success',
      message: 'Courses fetched',
      code : HttpStatus.OK,
      data: res
    }
  }

  async getCourseActive(): Promise<unknown> {
    const res = await this.prisma.courses.findMany(
      {
        where: {
          status: 'active',
          isActive: true
        }
      }
    );
    return {
      status: true,
      type: 'success',
      message: 'Courses fetched',
      code : HttpStatus.OK,
      data: res
    }
  }

  async getCourseDetail(courseId: string) : Promise<unknown> {
    const res = await this.prisma.courses.findUnique({
      where: {
        id: courseId
      }
    });

    if(!res)
    {
      return {
        status: false,
        type: 'error',
        message: 'Course not found',
        code : HttpStatus.NOT_FOUND,
      }
    }

    const detail = await this.prisma.courseDetail.findUnique({
      where: {
        courseId: courseId
      }
    });

    const exercises = await this.prisma.courseExercises.findMany({
      where: {
        courseId: courseId
      }
    });

    const courseExercises = await Promise.all(exercises.map(async (exercise) => {
      const exerciseData = await this.prisma.exercises.findUnique({
        where: {
          id: exercise.exerciseId
        }
      });
      const todos = await this.prisma.exercisesTodo.findMany({
        where: {
          exerciseId: exercise.exerciseId
        }
      });
      const exerciseTodos = await Promise.all(todos.map(async (todo) => {
        const todoData = await this.prisma.todo.findUnique({
          where: {
            id: todo.todoId
          }
        });
        return todoData;
      }));

      return {
        ...exerciseData,
        todos: exerciseTodos};
    }));

    

    const teacherData = await this.prisma.teacher.findUnique({
      where: {
        id: res.teacherId
      }
    });

 

   const schedule = await this.prisma.courseSchedule.findMany({
      where: {
        courseId: courseId
      }
    });

    return {
      status: true,
      type: 'success',
      message: 'Course fetched',
      code : HttpStatus.OK,
      data: {
        course: res,
        detail: detail,
        exercises: courseExercises,
        teacher: teacherData,
        schedule: schedule
      }
    }
  }

  async getUserSchedule(data: getUserCoursesDto) : Promise<unknown> {
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

    const userCourses = await this.prisma.courseEnrollment.findMany({
      where: {
        userId: data.userId
      }
    });

    const res = await Promise.all(userCourses.map(async (course) => {
      const courseData = await this.prisma.courses.findUnique({
        where: {
          id: course.courseId
        }
      });
      const schedule = await this.prisma.courseSchedule.findMany({
        where: {
          courseId: course.courseId
        }
      });
      return {
        course: courseData,
        schedule: schedule
      }
    }));

    return {
      status: true,
      type: 'success',
      message: 'Schedule fetched',
      code : HttpStatus.OK,
      data: res
    }
  }
}