import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

//dtos
import { 
  CreateWaterDto
} from './water.dto';

@Injectable()
export class WaterService {
  
  constructor(private prisma: PrismaService) {}

  async create(createWaterDto: CreateWaterDto) {
    const personal = await this.prisma.personal.findUnique({
      where: {
        userId: createWaterDto.userId
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
    const res = await this.prisma.waterHistory.create({
      data: {
        waterIntake: createWaterDto.waterIntake,
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
      message: 'Water created',
      code : HttpStatus.OK,
      data: res
    }
  }

  async getWaterIntakes(userId: string) {
    const personal = await this.prisma.personal.findUnique({
      where: {
        userId: userId
      }
    });
    const res = await this.prisma.waterHistory.findMany({
      where: {
        personalId: personal.id
      }
    });
   const total_water = res.reduce((acc, curr) => acc + curr.waterIntake, 0);


    return {
      status: true,
      type: 'success',
      code : HttpStatus.OK,
      data: {
        total_water,
        waterIntakes: res
      }
    }
  }

}
