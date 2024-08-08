import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

//dtos
import { 
  CreateCourseDto,
  UpdateCourseDto,
  deleteCourseDto,
  getCourseByIdDto,
  CreateCourseDetailDto,
  UpdateCourseDetailDto,
  deleteCourseDetailDto,
  getCourseDetailByIdDto,
} from './course.dto';

@Injectable()
export class CourseService {
  
  constructor(private prisma: PrismaService) {}

  async createCourse(data: CreateCourseDto) : Promise<unknown> {
    try{

      const res = await this.prisma.courses.create({
        data: {
          title: data.title,
          description: data.description,
          price: data.price,
          type: data.type,
          image: data.image,
          teacher: {
            connect: {
              id: data.teacherId
            }
          }
        }
      });
      if(!res){
        return {
          status: false,
          type: 'error',
          message: 'Course not created',
          code : HttpStatus.BAD_REQUEST,
        }
      }
      return {
        status: true,
        type: 'success',
        message: 'Course created',
        code : HttpStatus.OK,
        data: res
      }
    }catch(e){
      return {
        status: false,
        type: 'error',
        message: e.message,
        code : HttpStatus.BAD_REQUEST,
      }
    }
  }

  async getCourses(teacherId: string) : Promise<unknown> {
    const res = await this.prisma.courses.findMany({
      where: {
        teacherId: teacherId
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
        title: data.title,
        description: data.description,
        price: data.price,
        type: data.type,
        image: data.image,
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


  async createCourseDetail(data: CreateCourseDetailDto) : Promise<unknown> {
    const res = await this.prisma.courseDetail.create({
      data: {
        courses: {
          connect: {
            id: data.courseId
          }
        },
        title: data.title,
        detail: data.detail,
        image: data.image,
        warning: data.warning,
        needsInfo: data.needsInfo
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
        title: data.title,
        detail: data.detail,
        image: data.image,
        warning: data.warning,
        needsInfo: data.needsInfo,
        courses: {
          connect: {
            id: data.courseId
          }
        }
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
