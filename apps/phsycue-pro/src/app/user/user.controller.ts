import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';

import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

import {
} from './user.dtos';



@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService, 
        private readonly authService: AuthService
    ) {}

    @Get('me')
    @ApiBearerAuth()
    async validateTokenCheck(@Headers('Authorization') auth: string) {
        const token = auth
        const isValid = await this.authService.validateUserToken(token);
        if (!isValid) {
            return {
                status: false,
                type: 'error',
                code: 401,
                message: 'Invalid Token',
              };
        }else{
            return this.userService.getUser(token);
        }
    }
}
