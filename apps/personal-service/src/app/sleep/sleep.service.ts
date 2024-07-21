import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

//dtos
import { 
  CreateSleepDto,
} from './sleep.dto';

@Injectable()
export class SleepService {
  
  constructor(private prisma: PrismaService) {}

  async create(createSleepDto: CreateSleepDto) {
    const personal = await this.prisma.personal.findUnique({
      where: {
        id: createSleepDto.personalId
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
    const res = await this.prisma.sleepHistory.create({
      data: {
        sleepTime: createSleepDto.sleepTime,
        wakeTime: createSleepDto.wakeTime,
        personal: {
          connect: {
            id: createSleepDto.personalId
          }
        }
      }
    });
    return {
      status: true,
      type: 'success',
      message: 'Sleep created',
      code : HttpStatus.OK,
      data: res
    }
  }

  async getSleepTimes(personalId: string) {
    const res = await this.prisma.sleepHistory.findMany({
      where: {
        personalId: personalId
      }
    });
    return {
      status: true,
      type: 'success',
      code : HttpStatus.OK,
      data: res
    }
  }
}
