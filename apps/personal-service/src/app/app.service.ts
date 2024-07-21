import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';


@Injectable()
export class AppService {

  constructor(private prismaService: PrismaService) {}

  async createPersonal(data: {userId: string}) {
    const find = await this.prismaService.user.findUnique({
      where: {
        id: data.userId,
      }
    });
    if (!find) {
      return {
        status: false,
        type: 'error',
        message: 'User not found',
        code : HttpStatus.NOT_FOUND,
        data: null
      }
    }

    const checkInDB = await this.prismaService.personal.findMany({
      where: {
        userId: data.userId
      }
    });

    if(checkInDB.length != 0) {
      return {
        status: false,
        type: 'error',
        message: 'Personal already exists',
        code : HttpStatus.BAD_REQUEST,
        data: null
      }
    }

    const res = await this.prismaService.personal.create({
      data: {
        userId: data.userId
      }
    });

    return {
      status: true,
      type: 'success',
      message: 'Personal created',
      code : HttpStatus.OK,
      data: res
    }

    
  }


}
