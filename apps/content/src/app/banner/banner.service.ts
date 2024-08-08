import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

//dtos
import { 
  CreateBannerDto,
  UpdateBannerDto,
} from './banner.dto';
import { get } from 'http';

@Injectable()
export class BannerService {
  constructor(private prisma: PrismaService) {}


  async createBanner(data: CreateBannerDto) {
    const banner = await this.prisma.banner.create({
      data: {
        name: data.name,
        description: data.description,
        imageURL: data.imageUrl,
        type: data.type,
      },
    });

    if (!banner) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        success: 'false',
        type: 'failed',
        message: 'Failed to create banner',
      };
    }else{
      return {
        status: HttpStatus.OK,
        success: 'true',
        type: 'success',
        message: 'Banner created successfully',
        data: banner,
      };
    }
  }

  async updateBanner(id: string, data: UpdateBannerDto) {
    const banner = await this.prisma.banner.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        imageURL: data.imageUrl,
        type: data.type,
        isActive: data.isActive,
      },
    });

    if (!banner) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        success: 'false',
        type: 'failed',
        message: 'Failed to update banner',
      };
    }else{
      return {
        status: HttpStatus.OK,
        success: 'true',
        type: 'success',
        message: 'Banner updated successfully',
        data: banner,
      };
    }
  }
    
  async getBanner() {
      const banner = await this.prisma.banner.findMany({
        where: {
          isActive: true,
        },
      });
      if (!banner) {
        return {
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          success: 'false',
          type: 'failed',
          message: 'Failed to get banner',
        };
      }else{
        return {
          status: HttpStatus.OK,
          success: 'true',
          type: 'success',
          message: 'Banner fetched successfully',
          data: banner,
        };
      }
    }

}
