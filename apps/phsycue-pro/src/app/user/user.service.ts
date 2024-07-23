import { Injectable,Inject, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import {
} from './user.dtos';

@Injectable()
export class UserService {
    constructor(
        private configService: ConfigService,
    ) {}
    
    async getUser(token: string): Promise<any> {
        try {
            const response = await axios.get(`${this.configService.get('AUTH_SERVICE_URL')}${this.configService.get('AUTH_SERVICE_PREFIX')}/user/me`, {
                headers: {
                    Authorization: token,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return {
                status: false,
                type: 'error',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
  }
