import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';

import { AuthService } from '../auth/auth.service';
import { ContentService } from './content.service';

import {
} from './content.dtos';


@ApiTags('content')
@Controller('content')
export class ContentController {
    constructor(
        private readonly authService: AuthService,
        private readonly contentService: ContentService
    ) {}
    
    @Get('banner')
    async getBanner(){
        return this.contentService.getBanner();
    }
}
