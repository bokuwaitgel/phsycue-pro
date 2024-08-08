import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { map } from 'rxjs';


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

  async getPersonal(userId: string) {
    const find = await this.prismaService.user.findUnique({
      where: {
        id: userId,
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

    let res = await this.prismaService.personal.findFirst({
      where: {
        userId: userId
      }
    });

    if(!res) {
      const result = (await this.createPersonal({userId: userId}));
      res = result.data    
    }

    const body = await this.prismaService.bodyHistory.findFirst({
      where: {
        personalId: res.id
      }
    });

    const food = await this.prismaService.caloriesHistory.findMany({
      where: {
        personalId: res.id
      }
    });

    const all_food_eaten =  food.reduce((acc, curr) => acc + curr.caloriesIntake, 0);
    const water = await this.prismaService.waterHistory.findMany({
      where: {
        personalId: res.id
      }
    });
    let before_day_calories_intake = 0
    food.map((item) => {
      if(item.createdAt.getTime() > new Date().getTime() - 86400000) {
        before_day_calories_intake += item.caloriesIntake
      }
    });


    const all_water_intake =  water.reduce((acc, curr) => acc + curr.waterIntake, 0);
    let before_day_water_intake = 0
    
    water.map((item) => {
      if(item.createdAt.getTime() > new Date().getTime() - 86400000) {
        before_day_water_intake += item.waterIntake
      }
    });

    const sleep = await this.prismaService.sleepHistory.findMany({
      where: {
        personalId: res.id
      }
    });


    const all_sleep =  sleep.reduce((acc, curr) => acc + (curr.wakeTime.getTime() - curr.sleepTime.getTime()), 0);
    const last_day_sleep = sleep[sleep.length - 1] ? sleep[sleep.length - 1].wakeTime.getTime() - sleep[sleep.length - 1].sleepTime.getTime() : 0;

    const tracker =  await this.prismaService.tracker.findMany({
      where: {
        personalId: res.id
      }
    });

    const all_tracked_time = tracker.reduce((acc, curr) => acc + (curr.endTime.getTime() - curr.startTime.getTime()), 0);
    const last_day_tracked_time = tracker[tracker.length - 1] ? tracker[tracker.length - 1].endTime.getTime() - tracker[tracker.length - 1].startTime.getTime() : 0;

    return {
      status: true,
      type: 'success',
      message: 'Personal found',
      code : HttpStatus.OK,
      data: {
        personal: res,
        body: body,
        food: {
          all_food_eaten: all_food_eaten,
          before_day_calories_intake: before_day_calories_intake,
          food: food
        },
        water: {
          all_water_intake: all_water_intake,
          before_day_water_intake: before_day_water_intake,
          water: water
        },
        sleep: {
          all_sleep: all_sleep,
          last_day_sleep: last_day_sleep,
          sleep: sleep
        },
        tracker: {
          all_tracked_time: all_tracked_time,
          last_day_tracked_time: last_day_tracked_time,
          tracker: tracker
        }
      }
    }
  }


}
