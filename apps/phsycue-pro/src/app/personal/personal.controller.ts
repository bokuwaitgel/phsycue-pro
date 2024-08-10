import { Body, Controller, Get, Post, Param, Put, Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';

import { AuthService } from '../auth/auth.service';
import { PersonalService } from './personal.service';

import {
    CreateBodyDto,
    UpdateBodyDto,
    CreateFoodDto,
    CreateSleepDto,
    CreateWaterDto,
    StartTrackerDto,
    EndTrackerDto,
} from './personal.dtos';


@ApiTags('personal')
@Controller('personal')
export class PersonalController {
    constructor(
        private readonly authService: AuthService,
        private readonly contentService: PersonalService
    ) { }
    @Get('getPersonal')
    @ApiBearerAuth()
    async getPersonal(@Headers('Authorization') auth: string){
        const token = auth
        const isValid = await this.authService.validateUserToken(token);
        if (!isValid) {
            return {
                status: false,
                type: 'error',
                code: 401,
                message: 'Invalid Token',
            };
        }else if (isValid.success !== 'true') {
            return isValid;
        }
        return this.contentService.getPersonal(isValid.data.id);
    }
    

    @Post('createBody')
    @ApiBearerAuth()
    @ApiBody({ type: CreateBodyDto })
    async createBody(@Body() data: CreateBodyDto, @Headers('Authorization') auth: string) {
        const token = auth
        const isValid = await this.authService.validateUserToken(token);
        if (!isValid) {
            return {
                status: false,
                type: 'error',
                code: 401,
                message: 'Invalid Token',
            };
        }else if (isValid.success !== 'true') {
            return isValid;
        }
        return this.contentService.createBody({
            weight: data.weight,
            height: data.height,
            birthDate: data.birthDate,
            userId: isValid.data.id,
        });
    }


    @Post('createFood')
    @ApiBearerAuth()
    @ApiBody({ type: CreateFoodDto })
    async createFood(@Body() data: CreateFoodDto, @Headers('Authorization') auth: string) {
        const token = auth
        const isValid = await this.authService.validateUserToken(token);
        if (!isValid) {
            return {
                status: false,
                type: 'error',
                code: 401,
                message: 'Invalid Token',
            };
        }else if (isValid.success !== 'true') {
            return isValid;
        }
        return this.contentService.createFood({
            name: data.name,
            calories: data.calories,
            userId: isValid.data.id,
        });
    }

    @Post('createSleep')
    @ApiBearerAuth()
    @ApiBody({ type: CreateSleepDto })
    async createSleep(@Body() data: CreateSleepDto, @Headers('Authorization') auth: string) {
        const token = auth
        const isValid = await this.authService.validateUserToken(token);
        if (!isValid) {
            return {
                status: false,
                type: 'error',
                code: 401,
                message: 'Invalid Token',
            };
        }else if (isValid.success !== 'true') {
            return isValid;
        }
        return this.contentService.createSleep({
            sleepTime: data.sleepTime,
            wakeTime: data.wakeTime,
            userId: isValid.data.id,
        });
    }

    @Post('createWater')
    @ApiBearerAuth()
    @ApiBody({ type: CreateWaterDto })
    async createWater(@Body() data: CreateWaterDto, @Headers('Authorization') auth: string) {
        const token = auth
        const isValid = await this.authService.validateUserToken(token);
        if (!isValid) {
            return {
                status: false,
                type: 'error',
                code: 401,
                message: 'Invalid Token',
            };
        }else if (isValid.success !== 'true') {
            return isValid;
        }
        return this.contentService.createWater({
            userId: isValid.data.id,
            waterIntake: data.waterIntake,
        });
    }

    @Post('startTracker')
    @ApiBearerAuth()
    @ApiBody({ type: StartTrackerDto })
    async startTracker(@Body() data: StartTrackerDto, @Headers('Authorization') auth: string) {
        const token = auth
        const isValid = await this.authService.validateUserToken(token);
        if (!isValid) {
            return {
                status: false,
                type: 'error',
                code: 401,
                message: 'Invalid Token',
            };
        }
        else if (isValid.success !== 'true') {
            return isValid;
        }
        return this.contentService.startTracker({
            courseId: data.courseId,
            UserId: isValid.data.id,
        });
    }

    @Post('endTracker')
    @ApiBearerAuth()
    @ApiBody({ type: EndTrackerDto })
    async endTracker(@Body() data: EndTrackerDto, @Headers('Authorization') auth: string) {
        const token = auth
        const isValid = await this.authService.validateUserToken(token);
        if (!isValid) {
            return {
                status: false,
                type: 'error',
                code: 401,
                message: 'Invalid Token',
            };
        }
        return this.contentService.endTracker(data);
    }

    @Get('getFood')
    @ApiBearerAuth()
    async getFoodIntakes(@Headers('Authorization') auth: string){
        const token = auth
        const isValid = await this.authService.validateUserToken(token);
        if (!isValid) {
            return {
                status: false,
                type: 'error',
                code: 401,
                message: 'Invalid Token',
            };
        }else if (isValid.success !== 'true') {
            return isValid;
        }
        return this.contentService.getFood(isValid.data.id);
    }

    @Get('getSleep')
    @ApiBearerAuth()
    async getSleepTimes( @Headers('Authorization') auth: string){
        const token = auth
        const isValid = await this.authService.validateUserToken(token);
        if (!isValid) {
            return {
                status: false,
                type: 'error',
                code: 401,
                message: 'Invalid Token',
            };
        }else if (isValid.success !== 'true') {
            return isValid;
        }
        return this.contentService.getSleep(isValid.data.id);
    }

    @Get('getWater')
    @ApiBearerAuth()
    async getWaterIntakes( @Headers('Authorization') auth: string){
        const token = auth
        const isValid = await this.authService.validateUserToken(token);
        if (!isValid) {
            return {
                status: false,
                type: 'error',
                code: 401,
                message: 'Invalid Token',
            };
        }else if (isValid.success !== 'true') {
            return isValid;
        }
        return this.contentService.getWater(isValid.data.id);
    }

    @Get('getBody')
    @ApiBearerAuth()
    async getBody(@Headers('Authorization') auth: string){
        const token = auth
        const isValid = await this.authService.validateUserToken(token);
        if (!isValid) {
            return {
                status: false,
                type: 'error',
                code: 401,
                message: 'Invalid Token',
            };
        }else if (isValid.success !== 'true') {
            return isValid;
        }
        return this.contentService.getBody(isValid.data.id);
    }

    @Put('updateBody')
    @ApiBearerAuth()
    @ApiBody({ type: UpdateBodyDto })
    async updateBody(@Body() data: UpdateBodyDto, @Headers('Authorization') auth: string) {
        const token = auth
        const isValid = await this.authService.validateUserToken(token);
        if (!isValid) {
            return {
                status: false,
                type: 'error',
                code: 401,
                message: 'Invalid Token',
            };
        }
        return this.contentService.updateBody(data);
    }

    @Get('getTracker')
    @ApiBearerAuth()
    async getTracker( @Headers('Authorization') auth: string){
        const token = auth
        const isValid = await this.authService.validateUserToken(token);
        if (!isValid ) {
            return {
                status: false,
                type: 'error',
                code: 401,
                message: 'Invalid Token',
            };
        }else if (isValid.success !== 'true') {
            return isValid;
        }
        return this.contentService.getTracker(isValid.data.id);
    }

}
