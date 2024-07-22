import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import {
    LoginUserDto,
} from './auth.dtos';



@ApiTags('user')
@Controller('user')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiBody({ type: LoginUserDto })
    @ApiConsumes('application/json')
    async login(@Body() data: LoginUserDto) {
        return this.authService.login(data);
    }
 
}
