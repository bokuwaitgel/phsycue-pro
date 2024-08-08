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
        userId: createSleepDto.userId
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
            id: personal.id
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

  async getSleepTimes(userId: string) {
    const personal = await this.prisma.personal.findUnique({
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

    const res = await this.prisma.sleepHistory.findMany({
      where: {
        personalId: personal.id
      }
    });
    const total_sleep = res.reduce((acc, curr) => acc + curr.wakeTime.getTime() - curr.sleepTime.getTime(), 0);
    const last_day_sleep = res[res.length - 1] ? res[res.length - 1].wakeTime.getTime() - res[res.length - 1].sleepTime.getTime() : 0;
    return {
      status: true,
      type: 'success',
      code : HttpStatus.OK,
      data: {
        total_sleep,
        last_day_sleep,
        sleep_history: res
      }
    }
  }
}
