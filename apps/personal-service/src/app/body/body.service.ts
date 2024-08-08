import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

//dtos
import { 
  CreateBodyDto,
  UpdateBodyDto
} from './body.dto';

@Injectable()
export class BodyService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateBodyDto) {
    const personal = await this.prisma.personal.findUnique({
      where: {
        userId: body.userId
      }
    });

    if (!personal) {
      return {
        status: false,
        type: 'fail',
        code: HttpStatus.NOT_FOUND,
        message: 'Personal not found'
      };
    }
    const res = await this.prisma.bodyHistory.create({
      data: {
        weight: body.weight,
        height: body.height,
        birthDate: body.birthDate,
        personal: {
          connect: {
            id: personal.id
          }
        }
      }
    });
    return {
      status: true,
      type: 'success',
      message: 'Body created',
      code : HttpStatus.OK,
      data: res
    }
  }

  async update(body: UpdateBodyDto) {
    const find = await this.prisma.bodyHistory.findUnique({
      where: {
        id: body.id
      }
    });

    if (!find) {
      return {
        status: false,
        type: 'fail',
        code: HttpStatus.NOT_FOUND,
        message: 'Body not found'
      };
    }
  
    const res = await this.prisma.bodyHistory.update({
      where: {
        id: body.id
      },
      data: {
        weight: body.weight,
        height: body.height,
        birthDate: body.birthDate,
      }
    });
    return {
      status: true,
      type: 'success',
      message: 'Body updated',
      code : HttpStatus.OK,
      data: res
    }
  }

  async getBody(userId: string) {
      const personal = await this.prisma.personal.findFirst({
        where: {
          userId: userId
        }
      });

      if (!personal) {
        return {
          status: false,
          type: 'fail',
          code: HttpStatus.NOT_FOUND,
          message: 'Personal not found'
        };
      }
      const res = await this.prisma.bodyHistory.findFirst({
        where: {
          personalId: personal.id
        }
      });
  
      if (!res) {
        return {
          status: false,
          type: 'fail',
          code: HttpStatus.NOT_FOUND,
          message: 'Body not found'
        };
      }
      return {
        status: true,
        type: 'success',
        message: 'Body found',
        code : HttpStatus.OK,
        data: res
      }
  }
}
