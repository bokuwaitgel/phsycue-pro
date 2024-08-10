import { Injectable,Inject, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import {
    CreateWaterDto,
    CreateBodyDto,
    CreateFoodDto,
    CreateSleepDto,
    StartTrackerDto,
    EndTrackerDto,
    UpdateBodyDto
    
} from './personal.dtos';

@Injectable()
export class PersonalService {
    constructor(
        private configService: ConfigService,
    ) {}


    async getPersonal(id: string) {
        const url = `${this.configService.get('PERSONAL_SERVICE_URL')}${this.configService.get('PERSONAL_SERVICE_PREFIX')}/get`
        console.log(url)
        const res  = await axios.post(url,
            JSON.stringify({
                userId: id
            }),{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }
    async createWater(data: {
        userId: string;
        waterIntake: number;
    })
    {
        const url = `${this.configService.get('PERSONAL_SERVICE_URL')}${this.configService.get('PERSONAL_SERVICE_PREFIX')}/water/createWater`

        const res  = await axios.post(url,
            JSON.stringify({
            userId: data.userId,
            waterIntake: data.waterIntake
        }),{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }

    async createBody(data: {
        userId: string;
        weight: number;
        height: number;
        birthDate: Date;
    })
    {
        const url = `${this.configService.get('PERSONAL_SERVICE_URL')}${this.configService.get('PERSONAL_SERVICE_PREFIX')}/body/createBody`

        const res  = await axios.post(url,
            JSON.stringify({
            userId: data.userId,
            weight: data.weight,
            height: data.height,
            birthDate: data.birthDate
        }),{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }

    async createFood(data: {
        userId: string;
        name: string;
        calories: number;
    })
    {
        const url = `${this.configService.get('PERSONAL_SERVICE_URL')}${this.configService.get('PERSONAL_SERVICE_PREFIX')}/food/createFood`

        const res  = await axios.post(url,
            JSON.stringify({
            userId: data.userId,
            name: data.name,
            calories: data.calories
        }),{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }

    async createSleep(data: {
        userId: string;
        sleepTime: Date;
        wakeTime: Date;
    })
    {
        const url = `${this.configService.get('PERSONAL_SERVICE_URL')}${this.configService.get('PERSONAL_SERVICE_PREFIX')}/sleep/createSleep`

        const res  = await axios.post(url,
            JSON.stringify({
            userId: data.userId,
            sleepTime: data.sleepTime,
            wakeTime: data.wakeTime
        }),{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }

    async startTracker(data: {UserId: string, courseId: string})
    {
        const url = `${this.configService.get('PERSONAL_SERVICE_URL')}${this.configService.get('PERSONAL_SERVICE_PREFIX')}/tracker/start`

        const res  = await axios.post(url,
            JSON.stringify({
            userId: data.UserId,
            courseId: data.courseId
        }),{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }

    async endTracker(data: EndTrackerDto)
    {
        const url = `${this.configService.get('PERSONAL_SERVICE_URL')}${this.configService.get('PERSONAL_SERVICE_PREFIX')}/tracker/end`

        const res  = await axios.post(url,
            JSON.stringify({
            id: data.id
        }),{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }

    async updateBody(data: UpdateBodyDto)
    {
        const url = `${this.configService.get('PERSONAL_SERVICE_URL')}${this.configService.get('PERSONAL_SERVICE_PREFIX')}/body/updateBody`

        const res  = await axios.put(url,
            JSON.stringify({
            id: data.id,
            weight: data.weight,
            height: data.height,
            birthDate: data.birthDate
        }),{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }

    async getBody(userId: string)
    {
        const url = `${this.configService.get('PERSONAL_SERVICE_URL')}${this.configService.get('PERSONAL_SERVICE_PREFIX')}/body/getBody/${userId}`

        const res  = await axios.get(url,{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }

    async getFood(userId: string)
    {
        const url = `${this.configService.get('PERSONAL_SERVICE_URL')}${this.configService.get('PERSONAL_SERVICE_PREFIX')}/food/getFood/${userId}`

        const res  = await axios.get(url,{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }

    async getSleep(userId: string)
    {
        const url = `${this.configService.get('PERSONAL_SERVICE_URL')}${this.configService.get('PERSONAL_SERVICE_PREFIX')}/sleep/getSleep/${userId}`

        const res  = await axios.get(url,{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }

    async getWater(userId: string)
    {
        const url = `${this.configService.get('PERSONAL_SERVICE_URL')}${this.configService.get('PERSONAL_SERVICE_PREFIX')}/water/getWater/${userId}`

        const res  = await axios.get(url,{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }

    async getTracker(userId: string)
    {
        const url = `${this.configService.get('PERSONAL_SERVICE_URL')}${this.configService.get('PERSONAL_SERVICE_PREFIX')}/tracker/getTracker/${userId}`

        const res  = await axios.get(url,{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }
  }
