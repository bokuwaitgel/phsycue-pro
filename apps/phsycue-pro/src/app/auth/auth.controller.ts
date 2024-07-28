import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import {
    LoginUserDto,
    CreateUserDto,
    RefreshTokenDto,
    ResetPasswordDto,
    ChangePasswordDto,
    OtpDto,
    VerifyOtpDto,
} from './auth.dtos';



@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiBody({ type: LoginUserDto })
    @ApiConsumes('application/json')
    async login(@Body() data: LoginUserDto) {
        return this.authService.login(data);
    }

    @Post('register')
    @ApiBody({ type:  CreateUserDto })
    @ApiConsumes('application/json')
    async register(@Body() data: CreateUserDto) {
        return this.authService.register(data);
    }

    @Post('refresh')
    @ApiBody({ type:  RefreshTokenDto })
    @ApiConsumes('application/json')
    async refresh(@Body() data: RefreshTokenDto) {
        return this.authService.refreshToken(data);
    }

    @Post('sendOtp')
    @ApiBody({ type:  OtpDto })
    @ApiConsumes('application/json')
    async sendOtp(@Body() data: OtpDto) {
        return this.authService.sendOtp(data);
    }

    @Post('verifyOtp')
    @ApiBody({ type:  VerifyOtpDto })
    @ApiConsumes('application/json')
    async verifyOtp(@Body() data: VerifyOtpDto) {
        return this.authService.verifyOtp(data);
    }

    @Post('resetPassword')
    @ApiBody({ type:  ChangePasswordDto })
    @ApiConsumes('application/json')
    async changePassword(@Body() data: ChangePasswordDto) {
        return this.authService.changePassword(data);
    }

    @Post('changePassword')
    @ApiBearerAuth()
    @ApiBody({ type:  ResetPasswordDto })
    @ApiConsumes('application/json')
    async resetPassword(@Headers('Authorization') auth: string, @Body() data: ResetPasswordDto) {
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
            return this.authService.resetPassword(data);
        }
    }

    @Post('validateTokenCheck')
    @ApiBearerAuth()
    async validateTokenCheck(@Headers('Authorization') auth: string) {
        // split auth
        const token = auth.split(' ')[1];
        return this.authService.validateUserToken(token);
    }
 
}
