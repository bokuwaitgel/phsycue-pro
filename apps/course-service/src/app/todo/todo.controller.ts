import { Controller, Get, Post, Body, Param, Put, Delete} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { TodoService } from './todo.service';

//dtos
import { 
  CreateTodoDto,
  UpdateTodoDto,
  deleteTodoDto,
  AddTodoToExerciseDto
} from './todo.dtos';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('getTodos/:teacherId')
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'Data' })
  getTodos(@Param('teacherId') teacherId: string){
    return this.todoService.getTodos(teacherId);
  }

  @Get('getTodoById/:todoid')
  @ApiOperation({ summary: 'Get todo by id' })
  @ApiResponse({ status: 200, description: 'Data' })
  getTodoById(@Param('todoid') todoid: string){
    return this.todoService.getTodoById({id: todoid});
  }

  @Post('createTodo')
  @ApiOperation({ summary: 'Create todo' })
  @ApiResponse({ status: 200, description: 'Data' })
  public async createTodo(@Body() data: CreateTodoDto) {
    return this.todoService.createTodo(data);
  }

  @Put('updateTodo')
  @ApiOperation({ summary: 'Update todo' })
  @ApiResponse({ status: 200, description: 'Data' })
  public async updateTodo(@Body() data: UpdateTodoDto) {
    return this.todoService.updateTodo(data);
  }

  @Delete('deleteTodo')
  @ApiOperation({ summary: 'Delete todo' })
  @ApiResponse({ status: 200, description: 'Data' })
  public async deleteTodo(@Body() data: deleteTodoDto) {
    return this.todoService.deleteTodo(data);
  }

  @Post('addTodoToExercise')
  @ApiOperation({ summary: 'Add todo to exercise' })
  @ApiResponse({ status: 200, description: 'Data' })
  public async addTodoToExercise(@Body() data: AddTodoToExerciseDto) {
    return this.todoService.addTodoToExercise(data);
  }
  
}
