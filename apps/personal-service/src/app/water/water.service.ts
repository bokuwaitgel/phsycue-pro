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
        id: createWaterDto.personalId
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
            id: createWaterDto.personalId
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

  async getWaterIntakes(personalId: string) {
    const res = await this.prisma.waterHistory.findMany({
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
