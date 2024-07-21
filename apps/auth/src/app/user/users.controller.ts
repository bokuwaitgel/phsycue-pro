import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';

import { JwtAuthGuard } from '../jwt-auth.guard';
import { UsersService } from './users.service';
import { TokenUpdateDto, CreateTeacherDto} from './users.user.dto';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  public async me(@Request() req) {
    return await this.usersService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('tokenUpdate')
  public async tokenUpdate(@Request() req, @Body() tokenUpdateDto: TokenUpdateDto): Promise<any> {
    return await this.usersService.tokenUpdate(req.user.id, tokenUpdateDto.token)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('delete')
  async deleteUser(@Request() req) {
    return await this.usersService.deleteUser(req.user.id);
  }

  @Post('createTeacher')
  public async createTeacher(@Request() req, @Body() createTeacherDto: CreateTeacherDto): Promise<any> {
    return await this.usersService.createTeacher(createTeacherDto)
  }

}
