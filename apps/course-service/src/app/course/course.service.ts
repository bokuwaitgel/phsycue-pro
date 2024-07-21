import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

//dtos
import { 
  CreateCourseDto,
  UpdateCourseDto,
  deleteCourseDto,
  getCourseByIdDto,
  AddExerciseToCourseDto,
  CreateCourseDetailDto,
  UpdateCourseDetailDto,
  deleteCourseDetailDto,
  getCourseDetailByIdDto,
} from './course.dto';

@Injectable()
export class CourseService {
  
  constructor(private prisma: PrismaService) {}

  async createCourse(data: CreateCourseDto) : Promise<unknown> {
    const res = await this.prisma.courses.create({
      data: {
        img: data.img,
        courseName: data.name,
        courseDescription: data.description,
        coursePrice: data.price,
        courseType: data.type,
        teacher: {
          connect: {
            id: data.teacherId
          }
        }
      }
    });
    return {
      status: true,
      type: 'success',
      message: 'Course created',
      code : HttpStatus.OK,
      data: res
    }
  }

  async getCourses() : Promise<unknown> {
    const res = await this.prisma.courses.findMany();
    return {
      status: true,
      type: 'success',
      message: 'Courses fetched',
      code : HttpStatus.OK,
      data: res
    }
  }

  async getCourseById(data: getCourseByIdDto)
  {
    const res = await this.prisma.courses.findUnique({
      where: {
        id: data.id
      }
    });
    return {
      status: true,
      type: 'success',
      message: 'Course fetched',
      code : HttpStatus.OK,
      data: res
    }
  }

  async updateCourse(data: UpdateCourseDto) : Promise<unknown> {
    const find = await this.prisma.courses.findUnique({
      where: {
        id: data.id
      }
    });
    if(!find) {
      return {
        status: false,
        type: 'error',
        message: 'Course not found',
        code : HttpStatus.NOT_FOUND,
      }
    }
    const res = await this.prisma.courses.update({
      where: {
        id: data.id
      },
      data: {
        img: data.img,
        courseName: data.name,
        courseDescription: data.description,
        coursePrice: data.price,
        courseType: data.type,
      }
    });
    return {
      status: true,
      type: 'success',
      message: 'Course updated',
      code : HttpStatus.OK,
      data: res
    }
  }

  async deleteCourse(data: deleteCourseDto) : Promise<unknown> {
    const find = await this.prisma.courses.findUnique({
      where: {
        id: data.id
      }
    });
    if(find)
    {
      await this.prisma.courses.delete({
        where: {
          id: data.id
        }
      });
      return {
        status: true,
        type: 'success',
        message: 'Course deleted',
        code : HttpStatus.OK,
      }
    }
    else
    {
      return {
        status: false,
        type: 'error',
        message: 'Course not found',
        code : HttpStatus.NOT_FOUND,
      }
    }
  }

  async addCourseToExercise(data: AddExerciseToCourseDto) : Promise<unknown> {
    const find_exercise = await this.prisma.exercises.findUnique({
      where: {
        id: data.exerciseId
      }
    });

    const find_course = await this.prisma.courses.findUnique({
      where: {
        id: data.courseId
      }
    });

    if(!find_exercise) {
      return {
        status: false,
        type: 'failed',
        message: 'Exercise not found',
        code : HttpStatus.NOT_FOUND,
      }
    }
    if(!find_course) {
      return {
        status: false,
        type: 'failed',
        message: 'Course not found',
        code : HttpStatus.NOT_FOUND,
      }
    }

    const res = await this.prisma.courseExercises.create({
      data: {
        courses: {
          connect: {
            id: data.courseId
          }
        },
        exercises: {
          connect: {
            id: data.exerciseId
          }
        }
      }
    });
    return {
      status: true,
      type: 'success',
      message: 'Course added to exercise',
      code : HttpStatus.OK,
      data: res
    }
  }

  async createCourseDetail(data: CreateCourseDetailDto) : Promise<unknown> {
    const res = await this.prisma.courseDetail.create({
      data: {
        courses: {
          connect: {
            id: data.courseId
          }
        },
        courseDescription: data.courseDescription,
      }
    });
    return {
      status: true,
      type: 'success',
      message: 'Course detail created',
      code : HttpStatus.OK,
      data: res
    }
  }

  async getCourseDetails() : Promise<unknown> {
    const res = await this.prisma.courseDetail.findMany();
    return {
      status: true,
      type: 'success',
      message: 'Course details fetched',
      code : HttpStatus.OK,
      data: res
    }
  }

  async getCourseDetailById(data: getCourseDetailByIdDto)
  {
    const res = await this.prisma.courseDetail.findUnique({
      where: {
        id: data.id
      }
    });
    return {
      status: true,
      type: 'success',
      message: 'Course detail fetched',
      code : HttpStatus.OK,
      data: res
    }
  }

  async updateCourseDetail(data: UpdateCourseDetailDto) : Promise<unknown> {
    const find = await this.prisma.courseDetail.findUnique({
      where: {
        id: data.id
      }
    });
    if(!find) {
      return {
        status: false,
        type: 'error',
        message: 'Course detail not found',
        code : HttpStatus.NOT_FOUND,
      }
    }
    const res = await this.prisma.courseDetail.update({
      where: {
        id: data.id
      },
      data: {
        courseDescription: data.courseDescription,
      }
    });
    return {
      status: true,
      type: 'success',
      message: 'Course detail updated',
      code : HttpStatus.OK,
      data: res
    }
  }

  async deleteCourseDetail(data: deleteCourseDetailDto) : Promise<unknown> {
    const find = await this.prisma.courseDetail.findUnique({
      where: {
        id: data.id
      }
    });
    if(find)
    {
      await this.prisma.courseDetail.delete({
        where: {
          id: data.id
        }
      });
      return {
        status: true,
        type: 'success',
        message: 'Course detail deleted',
        code : HttpStatus.OK,
      }
    }
    else
    {
      return {
        status: false,
        type: 'error',
        message: 'Course detail not found',
        code : HttpStatus.NOT_FOUND,
      }
    }
  }
}
