import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService, RegistrationStatus } from './app.service';
import { JwtAuthGuard } from './jwt-auth.guard';


import { 
  CreateUserDto,
  LoginUserDto,
  VerifyOtpDto,
  OtpDto,
  RefreshTokenDto,
  ChangePasswordDto,
  ResetPasswordDto,
} from './auth.dtos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );
    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    console.log('here');
    console.log(loginUserDto);
    return await this.authService.login(loginUserDto);
  }

  @Post('refresh')
  public async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<any> {
    return await this.authService.refreshAccessToken(refreshTokenDto.refreshToken);
  }

  @Post('sendOtp')
  public async sendOtp(@Body() otpDto: OtpDto): Promise<any> {
    return await this.authService.sendOtp(otpDto);
  }
  @Post('changePassword')
  public async changePassword(@Body() changePasswordDto: ChangePasswordDto): Promise<any> {
    return await this.authService.changePassword(changePasswordDto);
  }
  @Post('resetPassword')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async resetPassword(@Req() req, @Body() resetPasswordDto: ResetPasswordDto): Promise<any> {
    const userId = req.user.id;
    return await this.authService.resetPassword(userId, resetPasswordDto);
  }

  @Post('verifyOtp')
  public async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<any> {
    return await this.authService.verifyOtp(verifyOtpDto);
  }
}