import { Body, Controller, Get, Post,  Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ExerciseService } from './exercise.service';

//dtos
import { 
  CreateExerciseDto,
  UpdateExerciseDto,
  deleteExerciseDto,
} from './exercise.dto';

@ApiTags('exercise')
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get('getExercises')
  @ApiOperation({ summary: 'Get all exercises' })
  @ApiResponse({ status: 200, description: 'Data' })
  getExercises() {
    return this.exerciseService.getExercises();
  }

  @Get('getExerciseById')
  @ApiOperation({ summary: 'Get exercise by id' })
  @ApiResponse({ status: 200, description: 'Data' })
  getExerciseById(@Param('exerciseid') exerciseid: string){
    return this.exerciseService.getExerciseById({id: exerciseid});
  }

  @Post('createExercise')
  @ApiOperation({ summary: 'Create exercise' })
  @ApiResponse({ status: 200, description: 'Data' })
  public async createExercise(@Body() data: CreateExerciseDto) {
    return this.exerciseService.createExercise(data);
  }

  @Put('updateExercise')
  @ApiOperation({ summary: 'Update exercise' })
  @ApiResponse({ status: 200, description: 'Data' })
  public async updateExercise(@Body() data: UpdateExerciseDto) {
    return this.exerciseService.updateExercise(data);
  }

  @Delete('deleteExercise')
  @ApiOperation({ summary: 'Delete exercise' })
  @ApiResponse({ status: 200, description: 'Data' })
  public async deleteExercise( @Body() data: deleteExerciseDto) {
    return this.exerciseService.deleteExercise(data);
  }
}
