import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

//dtos
import { 
  createFoodDto
} from './food.dto';

@Injectable()
export class FoodService {
  
  constructor(private prisma: PrismaService) {}

  async create(createFoodDto: createFoodDto) {
    const personal = await this.prisma.personal.findUnique({
      where: {
        userId: createFoodDto.userId
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
    const res = await this.prisma.caloriesHistory.create({
      data: {
        name: createFoodDto.name,
        caloriesIntake: createFoodDto.calories,
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
      message: 'Food created',
      code : HttpStatus.OK,
      data: res
    }
  }

  async getCaloriesIntakes(userId: string) {
    const personal = await this.prisma.personal.findUnique({
      where: {
        userId: userId
      }
    });
    const res = await this.prisma.caloriesHistory.findMany({
      where: {
        personalId: personal.id
      }
    });
   const total_calories = res.reduce((acc, curr) => acc + curr.caloriesIntake, 0);
   return {
     status: true,
     type: 'success',
     message: 'Calories intake',
     code : HttpStatus.OK,
     data: {
        total_calories,
        history: res
     }
   }
  }

  async getCaloriesIntake(id: string) {

    const res = await this.prisma.caloriesHistory.findUnique({
      where: {
        id: id
      }
    });
    return {
      status: true,
      type: 'success',
      message: 'Calories intake',
      code : HttpStatus.OK,
      data: res
    }
  }


}
