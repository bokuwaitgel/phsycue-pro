import { Injectable,Inject, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import {
    LoginUserDto,
} from './auth.dtos';

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
    ) {}
    
    async login(data: LoginUserDto) {
        console.log(this.configService.get('AUTH_SERVICE_URL') + this.configService.get('AUTH_SERVICE_PREFIX') + '/auth/login')
        console.log(data)
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
}
