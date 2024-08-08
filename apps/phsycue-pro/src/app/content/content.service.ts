import { Injectable,Inject, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import {
} from './content.dtos';

@Injectable()
export class ContentService {
    constructor(
        private configService: ConfigService,
    ) {}
    
    async getBanner() {
        const url = `${this.configService.get('CONTENT_SERVICE_URL')}${this.configService.get('CONTENT_SERVICE_PREFIX')}/banner/getBanner`

        const res  = await axios.get(url,{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.data;
    }
  }
