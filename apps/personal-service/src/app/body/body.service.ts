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
        id: body.personalId
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
            id: body.personalId
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

  async getBody(bodyId: string) {
    const res = await this.prisma.bodyHistory.findUnique({
      where: {
        id: bodyId
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
