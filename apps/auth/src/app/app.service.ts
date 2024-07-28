import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { stat } from 'fs';
import { retry } from 'rxjs';
import {ConfigService} from '@nestjs/config';
import { PrismaService } from '../prisma.service';
import { UsersService } from './user/users.service';
import jwt from 'jsonwebtoken';

import {
  CreateUserDto,
  LoginUserDto,
  VerifyOtpDto,
  OtpDto,
  ChangePasswordDto,
  ResetPasswordDto,
  verifyTokenDto,
} from './auth.dtos';
import { JwtPayload } from './jwt.strategy';

import bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(userDto: CreateUserDto): Promise<any> {
    let status: RegistrationStatus = {
      success: true,
      type: 'success',
      message: 'ACCOUNT_CREATE_SUCCESS',
      code: HttpStatus.OK,
    };
    const userInDb = await this.prisma.user.findFirst({
      where: { mobile: userDto.mobile },
    });

    if (userInDb) {
      return {
        success: false,
        type: 'failed',
        message: 'user already exist',
        code: HttpStatus.CONFLICT,
      };
    }
    let data;
    try {
      data = await this.usersService.create(userDto);
      status.code = HttpStatus.CREATED;
    } catch (err) {
      status = {
        success: false,
        type: 'failed',
        message: err,
        code: HttpStatus.CONFLICT,
      };
    }
    const tokenAccess = await this._createTokenAccess(status?.data);
    const tokenRefresh = await this._createTokenRefresh(status?.data);
    status.data = {
      id: data.id,
      mobile: data.mobile,
      refreshToken: tokenRefresh.refreshToken,
      refreshTokenExpiry: tokenRefresh.refreshTokenExpiry,
      accessToken: tokenAccess.accessToken,
    };
  
    return status;
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    const decoded = jwt.verify(refreshToken, process.env.SECRETKEY) as {mobile: string, exp: number};
    console.log(decoded.exp)
    decoded.exp *= 1000
    const expireDate = new Date(decoded.exp)

    const user = await this.prisma.user.findFirst({
      where: {
        mobile: decoded.mobile,
      },
    });
    const now = new Date();

    if (now > expireDate) {
      return {
        code: HttpStatus.CONFLICT,
        success: 'false',
        type: 'failed',
        message: 'refresh token expired',
      };
    }
    if (!user) {
      return {
        code: HttpStatus.CONFLICT,
        success: 'false',
        type: 'failed',
        message: 'user does not exist',
      };
    }
    if (user.refreshToken !== refreshToken) {
      return {
        code: HttpStatus.CONFLICT,
        success: 'false',
        type: 'failed',
        message: 'invalid refresh token',
      };
    }
    const tokenAccess = await this._createTokenAccess(user);
    if (!tokenAccess) {
      return {
        code: HttpStatus.CONFLICT,
        success: 'false',
        type: 'failed',
        message: 'refresh token creation failed',
      };
    }

    return {
      code: HttpStatus.OK,
      data: {
        ...tokenAccess,
        user
      },
    };
  }
  async sendOtp(optDto: OtpDto): Promise<any> {
    const user = await this.usersService.findByLogin(optDto.mobile);

    if (optDto.isRegistering && user) {
      return {
        code: HttpStatus.CONFLICT,
        success: 'false',
        type: 'failed',
        messenge: 'user already exist',
      };
    }

    if (!user && !optDto.isRegistering) {
      return {
        code: HttpStatus.CONFLICT,
        success: 'false',
        type: 'failed',
        message: 'user does not exist',
      };
    }

    const response = await this.usersService.sendUserVerificationCode(
      optDto.mobile,
    );

    if (response) {
      return {
        code: HttpStatus.OK,
        success: 'true',
        type: 'success',
      };
    }
  }
  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<any> {
    const otp = await this.prisma.otp.findFirst({
      where: {
        mobile: verifyOtpDto.mobile,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const now = new Date();
    const createdAt = new Date(otp.createdAt);
    const diff = now.getTime() - createdAt.getTime();

    if (diff / 1000 > 120) {
      return {
        code: HttpStatus.CONFLICT,
        type: 'failed',
        message: 'expired',
      };
    }

    if (otp.otpCode === verifyOtpDto.otpCode) {
      return {
        code: HttpStatus.OK,
        type: 'success',
      };
    }
    return {
      code: HttpStatus.CONFLICT,
      type: 'failed',
      message: 'invalid',
    };
  }

  async changePassword(userId: string, resetPasswordDto: ResetPasswordDto) : Promise<any> {
    let pwd = "";
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    pwd = await bcrypt.hash(resetPasswordDto.currentPassword, user.salt)
    if(pwd != user.password){
      return {
        code: HttpStatus.CONFLICT,
        success: 'false',
        type: 'failed',
        message: 'Одоогийн нууц үг буруу байна.',
      };
    }
    pwd = ""
    let salt = ""
    await this.usersService.hashPassword(resetPasswordDto.newPassword).then((value) => {
      pwd = value.hash;
      salt = value.salt;
    })

    await this.prisma.user.update({
      where: {
        id: userId,
      }, 
      data: {
        password: pwd,
        salt: salt,
      }
    })
    return {
      code: HttpStatus.OK,
      success: true,
      type: 'success',
    };
  }
  async resetPassword(changePasswordDto: ChangePasswordDto) : Promise<any> {
    const user = await this.usersService.findByLogin(changePasswordDto.mobile);
    if (!user) {
      return {
        code: HttpStatus.CONFLICT,
        success: 'false',
        type: 'failed',
        message: 'user does not exist',
      };
    }
    let pwd = "", salt = "";
    await this.usersService.hashPassword(changePasswordDto.newPassword).then((value) => {
      pwd = value.hash;
      salt = value.salt;
    })

    await this.prisma.user.update({
      where: {
        id: user.id,
      }, 
      data: {
        password: pwd,
        salt: salt,
      }
    })
    return {
      code: HttpStatus.OK,
      success: true,
      type: 'success',
    };
  }
  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.findByLogin(loginUserDto.mobile);

    if (!user) {
      return {
        code: HttpStatus.CONFLICT,
        success: 'false',
        type: 'failed',
        message: 'user does not exist',
      };
    }
    const tokenAccess = await this._createTokenAccess(user);
    const tokenRefresh = await this._createTokenRefresh(user);
    // let smsSent = false;
    const salt = user.salt;
    const hash = user.password;
    
    const curHash = await bcrypt.hash(loginUserDto.password, salt);
    if(curHash != hash) {
      return {
        code: HttpStatus.CONFLICT,
        success: 'false',
        type: 'failed',
        message: 'Нууц үг буруу.',
      };
    }
    if (!tokenAccess && !tokenRefresh) {
      return {
        code: HttpStatus.CONFLICT,
        success: 'false',
        type: 'failed',
        message: 'refresh token or access token creation failed',
      };
    }

    return {
      code: HttpStatus.OK,
      success: true,
      type: 'success',
      data: {
        ...user,
        refreshToken: tokenRefresh.refreshToken,
        refreshTokenExpiry: tokenRefresh.refreshTokenExpiry,
        accessToken: tokenAccess.accessToken,
      }
    };
  }

  private async _createTokenAccess({ mobile }): Promise<any> {
    const user: JwtPayload = { mobile };

    const accessToken = await this.jwtService.signAsync(user, {
      secret: process.env.SECRETKEY,
      expiresIn: process.env.EXPIRESINACCESS,
    });

    return {
      accessToken,
    };
  }

  private async _createTokenRefresh({ mobile }): Promise<any> {
    const user: JwtPayload = {
      mobile
    };

    const refreshToken = await this.jwtService.signAsync(user, {
      secret: process.env.SECRETKEY,
      expiresIn: process.env.EXPIRESINREFRSH,
    });
    const refreshTokenExpiry = new Date();
    refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 60);

    await this.prisma.user.update({
      where: {
        mobile: mobile,
      },
      data: {
        refreshToken: refreshToken,
        refreshTokenExpiry: refreshTokenExpiry,
      },
    });

    return {
      refreshToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findByLogin(payload.mobile);
    if (!user) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async verifyToken(data: verifyTokenDto): Promise<any> {
    try {
      const decoded = this.jwtService.verify(data.token) as { mobile: string};
      const user = await this.usersService.findByLogin(decoded.mobile);
      if (!user) {
        return {
          code: HttpStatus.CONFLICT,
          success: 'false',
          type: 'failed',
          message: 'user does not exist',
        };
      }
      return {
        code: HttpStatus.OK,
        success: 'true',
        type: 'success',
        message: 'valid token',
      };
    } catch (err) {
      return {
        code: HttpStatus.CONFLICT,
        success: 'false',
        type: 'failed',
        message: 'invalid token',
      };
    }
  }
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
  code: number;
  type: string;
  data?: {
    id: string;
    mobile: string;
    refreshToken: string;
    refreshTokenExpiry: Date;
    accessToken: string;
  };

  }
export interface RegistrationSeederStatus {
  success: boolean;
  message: string;
  data?: User[];
}
