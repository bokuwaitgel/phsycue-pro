import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

//dtos
import { 
  CreateExerciseDto,
  UpdateExerciseDto,
  deleteExerciseDto,
  getExerciseByIdDto
} from './exercise.dto';

@Injectable()
export class ExerciseService {
  
  constructor(private prisma: PrismaService) {}

  async createExercise(data: CreateExerciseDto) : Promise<unknown> {
    const res = await this.prisma.exercises.create({
      data: {
        exerciseName: data.name,
        exerciseDescription: data.description,
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
      message: 'Exercise created',
      code : HttpStatus.OK,
      data: res
    }
  }

  async getExercises() : Promise<unknown> {
    const res = await this.prisma.exercises.findMany();
    return {
      status: true,
      type: 'success',
      message: 'Exercises fetched',
      code : HttpStatus.OK,
      data: res
    }
  }

  async getExerciseById(data: getExerciseByIdDto)
  {
    const res = await this.prisma.exercises.findUnique({
      where: {
        id: data.id
      }
    });
    return {
      status: true,
      type: 'success',
      message: 'Exercise fetched',
      code : HttpStatus.OK,
      data: res
    }
  }

  async updateExercise(data: UpdateExerciseDto) : Promise<unknown> {
    const find = await this.prisma.exercises.findUnique({
      where: {
        id: data.id
      }
    });
    if(!find) {
      return {
        status: false,
        type: 'failed',
        message: 'Exercise not found',
        code : HttpStatus.NOT_FOUND,
      }
    }
    const res = await this.prisma.exercises.update({
      where: {
        id: data.id
      },
      data: {
        exerciseName: data.name,
        exerciseDescription: data.description
      }
    });
    return {
      status: true,
      type: 'success',
      message: 'Exercise updated',
      code : HttpStatus.OK,
      data: res
    }
  }

  async deleteExercise(data: deleteExerciseDto) : Promise<unknown> {
    const find = await this.prisma.exercises.findUnique({
      where: {
        id: data.id
      }
    });
    if(!find) {
      return {
        status: false,
        type: 'failed',
        message: 'Exercise not found',
        code : HttpStatus.NOT_FOUND,
      }
    }
    const res = await this.prisma.exercises.delete({
      where: {
        id: data.id
      }
    });
    return {
      status: true,
      type: 'success',
      message: 'Exercise deleted',
      code : HttpStatus.OK,
      data: res
    }
  }
}
