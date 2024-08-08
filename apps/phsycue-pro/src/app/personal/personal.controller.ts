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
    @Get('getPersonal/:userId')
    @ApiBearerAuth()
    async getPersonal(@Param('userId') userId: string, @Headers('Authorization') auth: string){
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
        return this.contentService.getPersonal(userId);
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
        }
        return this.contentService.createBody(data);
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
        }
        return this.contentService.createFood(data);
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
        }
        return this.contentService.createSleep(data);
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
        }
        return this.contentService.createWater(data);
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
        return this.contentService.startTracker(data);
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

    @Get('getFood/:userId')
    @ApiBearerAuth()
    async getFoodIntakes(@Param('userId') userId: string, @Headers('Authorization') auth: string){
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
        return this.contentService.getFood(userId);
    }

    @Get('getSleep/:userId')
    @ApiBearerAuth()
    async getSleepTimes(@Param('userId') userId: string, @Headers('Authorization') auth: string){
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
        return this.contentService.getSleep(userId);
    }

    @Get('getWater/:userId')
    @ApiBearerAuth()
    async getWaterIntakes(@Param('userId') userId: string, @Headers('Authorization') auth: string){
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
        return this.contentService.getWater(userId);
    }

    @Get('getBody/:userId')
    @ApiBearerAuth()
    async getBody(@Param('userId') userId: string, @Headers('Authorization') auth: string){
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
        return this.contentService.getBody(userId);
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

    @Get('getTracker/:userId')
    @ApiBearerAuth()
    async getTracker(@Param('userId') userId: string, @Headers('Authorization') auth: string){
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
        return this.contentService.getTracker(userId);
    }

}
