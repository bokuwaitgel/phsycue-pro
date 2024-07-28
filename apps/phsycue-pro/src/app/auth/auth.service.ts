import { Injectable,Inject, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import {
    LoginUserDto,
    CreateUserDto,
    RefreshTokenDto,
    ResetPasswordDto,
    ChangePasswordDto,
    OtpDto,
    VerifyOtpDto,
} from './auth.dtos';
import { json } from 'stream/consumers';

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
    ) {}
    
    async login(data: LoginUserDto) {
        const login = await axios.post(
            this.configService.get('AUTH_SERVICE_URL') + this.configService.get('AUTH_SERVICE_PREFIX') + '/auth/login',
            JSON.stringify(data),
            {
              headers:{"Content-Type" : "application/json"}
            }
      
          ).catch((error) => {
            console.error('Error during sending sms:', error);
          }
          );
        
        if (login) {
            return login.data; 
        }else{
            return {
                status: false,
                type: 'error',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
              };
        }
    }
    
    async register(data: CreateUserDto) {
        const register = await axios.post(
            this.configService.get('AUTH_SERVICE_URL') + this.configService.get('AUTH_SERVICE_PREFIX') + '/auth/register',
            JSON.stringify(data),
            {
              headers:{"Content-Type" : "application/json"}
            }
      
          ).catch((error) => {
            console.error('Error during sending sms:', error);
          }
          );
        
        if (register) {
            return register.data; 
        }else{
            return {
                status: false,
                type: 'error',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
              };
            }
    }

    async refreshToken(data: RefreshTokenDto) {
        const refreshToken = await axios.post(
            this.configService.get('AUTH_SERVICE_URL') + this.configService.get('AUTH_SERVICE_PREFIX') + '/auth/refresh',
            JSON.stringify(data),
            {
              headers:{"Content-Type" : "application/json"}
            }
      
          ).catch((error) => {
            console.error('Error during sending sms:', error);
          }
          );
        
        if (refreshToken) {
            return refreshToken.data; 
        }else{
            return {
                status: false,
                type: 'error',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
              };
        }
    }

    async sendOtp(data: OtpDto) {
        const sendOtp = await axios.post(
            this.configService.get('AUTH_SERVICE_URL') + this.configService.get('AUTH_SERVICE_PREFIX') + '/auth/sendOtp',
            JSON.stringify(data),
            {
              headers:{"Content-Type" : "application/json"}
            }
      
          ).catch((error) => {
            console.error('Error during sending sms:', error);
          }
          );
        
        if (sendOtp) {
            return sendOtp.data; 
        }else{
            return {
                status: false,
                type: 'error',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
              };
        }
    }

    async verifyOtp(data: VerifyOtpDto) {
        const verifyOtp = await axios.post(
            this.configService.get('AUTH_SERVICE_URL') + this.configService.get('AUTH_SERVICE_PREFIX') + '/auth/verifyOtp',
            JSON.stringify(data),
            {
              headers:{"Content-Type" : "application/json"}
            }
      
          ).catch((error) => {
            console.error('Error during sending sms:', error);
          }
          );
        
        if (verifyOtp) {
            return verifyOtp.data; 
        }else{
            return {
                status: false,
                type: 'error',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
              };
        }
    }

    async changePassword(data: ChangePasswordDto) {
        const changePassword = await axios.post(
            this.configService.get('AUTH_SERVICE_URL') + this.configService.get('AUTH_SERVICE_PREFIX') + '/auth/changePassword',
            JSON.stringify(data),
            {
              headers:{"Content-Type" : "application/json"}
            }
      
          ).catch((error) => {
            console.error('Error during sending sms:', error);
          }
          );
        
        if (changePassword) {
            return changePassword.data; 
        }else{
            return {
                status: false,
                type: 'error',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
              };
        }
    }

    async resetPassword(data: ResetPasswordDto) {
        const resetPassword = await axios.post(
            this.configService.get('AUTH_SERVICE_URL') + this.configService.get('AUTH_SERVICE_PREFIX') + '/auth/resetPassword',
            JSON.stringify(data),
            {
              headers:{"Content-Type" : "application/json"}
            }
      
          ).catch((error) => {
            console.error('Error during sending sms:', error);
          }
          );
        
        if (resetPassword) {
            return resetPassword.data; 
        }else{
            return {
                status: false,
                type: 'error',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
              };
        }
    }

    async validateUserToken(token: string) {
      const data =JSON.stringify({token: token});
      console.log(this.configService.get('AUTH_SERVICE_URL') + this.configService.get('AUTH_SERVICE_PREFIX') + '/auth/validateToken',{token: token},);
        const verifyToken = await axios.post(
            this.configService.get('AUTH_SERVICE_URL') + this.configService.get('AUTH_SERVICE_PREFIX') + '/auth/validateToken',
            data,
            {
              headers:{"Content-Type" : "application/json"}
            }
      
          ).catch((error) => {
            console.error('Error during sending sms:', error);
          }
          );
        
        if (verifyToken) {
            return verifyToken.data; 
        }else{
            return {
                status: false,
                type: 'error',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
              };
        }
    }


}
