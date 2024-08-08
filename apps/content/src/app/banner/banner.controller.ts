import { Body, Controller, Delete, Get, Post, Put, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { BannerService } from './banner.service';

//dtos
import { 
  CreateBannerDto,
  UpdateBannerDto,
} from './banner.dto';

@ApiTags('banner')
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get('getBanner')
  @ApiOperation({ summary: 'Get banner' })
  @ApiResponse({ status: 200, description: 'Data' })
  public async getBanner(){
    return this.bannerService.getBanner();
  }

  @Post('createBanner')
  @ApiOperation({ summary: 'Create banner' })
  @ApiResponse({ status: 200, description: 'Data' })
  public async createBanner(@Body() data: CreateBannerDto) {
    return this.bannerService.createBanner(data);
  }

  @Put('updateBanner')
  @ApiOperation({ summary: 'Update banner' })
  @ApiResponse({ status: 200, description: 'Data' })
  public async updateBanner(@Body() data: UpdateBannerDto, @Param('bannerid') bannerid: string){
    return this.bannerService.updateBanner(bannerid, data);
  }

}

