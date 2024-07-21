import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import axios from 'axios';

import {ConfigService} from '@nestjs/config';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto, CreateTeacherDto } from './users.user.dto';


import bcrypt from 'bcrypt';
const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) { }
  async hashPassword(password): Promise<any> {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return { hash, salt };
  }
  async deleteUser(id: string): Promise<any> {
    try {
      await this.prisma.user.delete({
        where: {
          id
        },
      })
      return {
        status: true,
        type: 'success',
        code: HttpStatus.OK,
      }
    } catch (error) {
      console.error(error);
      return {
        status: false,
        type: 'error',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      }
    }
  }

  async create(userDto: CreateUserDto): Promise<any> {
    let pwd = "", salt = "";
    await this.hashPassword(userDto.password).then((value) => {
      pwd = value.hash;
      salt = value.salt;
    });
    let userInDb = await this.prisma.user.findFirst({
      where: { mobile: userDto.mobile },
    });

    if (!userInDb) {
      userInDb = await this.prisma.user.create({
        data: {
          mobile: userDto.mobile,
          firstName: userDto.firstName,
          lastName: userDto.lastName,
          email: userDto.email,
          password: pwd,
          salt: salt,
          refreshToken: '',
        },
      });   
    }

  
    return await this.prisma.user.findFirst({
      where: {
        mobile: userInDb.mobile,
      }
    });
  }

  async createTeacher(teacherDto: CreateTeacherDto): Promise<any> {
    //check user exists
    const user = await this.findByLogin(teacherDto.mobile);
    if (!user) {
      return {
        status: false,
        type: 'error',
        code: HttpStatus.NOT_FOUND,
        message: 'User not found',
      };
    }
    const userId = user.id;
    let teacherInDb = await this.prisma.teacher.findFirst({
      where: { userId },
    });
    console.log(teacherInDb)

    if (!teacherInDb) {
      teacherInDb = await this.prisma.teacher.create({
        data: {
          userId,
        },
      });
    }

    return await this.prisma.teacher.findFirst({
      where: {
        userId,
      }
    });
  }
  
  async findByLogin(mobile: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { mobile: mobile }
    });
    return user;
  }

  async findById(id: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      })
      return {
        status: true,
        type: 'success',
        code: HttpStatus.OK,
        ...user,
      };
    }
    catch (err) {
      console.error(err);
      return {
        status: false,
        type: 'error',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      }
    }
  }

  generateUserVerificationCode() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  async tokenUpdate(id: string, token: string) {
    try {
      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          pushToken: token,
        },
      });

      return {
        status: true,
        type: 'success',
        code: HttpStatus.OK,
      };
    } catch (error) {
      console.error('Error during token update:', error);

      return {
        status: false,
        type: 'error',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      };
    }
  }
  async sendSMSToUser(mobile: string, body: string) {

    const data ={
      to: "+976"+mobile,
      body: body,
    }
    console.log(data);
    const smsSent = await axios.post(
      this.configService.get('SMS_SERVICE_URI'),
      data,
      {
        headers:{"Content-Type" : "application/json"}
      }

    ).catch((error) => {
      console.error('Error during sending sms:', error);
    }
    );
    // console.log(smsSent);
    return smsSent
  }

  async sendUserVerificationCode(mobile: string) {
    const verificationCode = this.generateUserVerificationCode();

    const smsSent = await this.sendSMSToUser(
      mobile,
      `Таны баталгаажуулах код: ${verificationCode}`,
    );

    if (smsSent) {
      await this.prisma.otp.create({
        data: {
          mobile: mobile,
          otpCode: verificationCode,
        },
      });
    }

    return smsSent;
  }
}
