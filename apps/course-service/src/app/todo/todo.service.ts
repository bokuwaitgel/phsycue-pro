import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

//dtos
import { 
  CreateTodoDto,
  UpdateTodoDto,
  deleteTodoDto,
  getTodoByIdDto,
  AddTodoToExerciseDto
} from './todo.dtos';

@Injectable()
export class TodoService {
  
  constructor(private prisma: PrismaService) {}

  async createTodo(data: CreateTodoDto) : Promise<unknown> {
    const res = await this.prisma.todo.create({
      data: {
        sets: parseInt(data.sets),
        refs: parseInt(data.refs),
        weight: parseFloat(data.weights),
        bodyPart: data.body_parts,
        total: parseInt(data.total),
        teacher: {
          connect: {
            id: data.teacherId
          }
        }
      }
    });
    return {
      status: true,
      type: 'success',
      message: 'Todo created',
      code : HttpStatus.OK,
      data: res
    }
  }

  async getTodos() : Promise<unknown> {
    const res = await this.prisma.todo.findMany();
    console.log(res);
    return {
      status: true,
      type: 'success',
      message: 'Todos fetched',
      code : HttpStatus.OK,
      data: res
    }
  }

  async getTodoById(data: getTodoByIdDto)
  {
    const res = await this.prisma.todo.findUnique({
      where: {
        id: data.id
      }
    });
    return {
      status: true,
      type: 'success',
      message: 'Todo fetched',
      code : HttpStatus.OK,
      data: res
    }
  }

  async updateTodo(data: UpdateTodoDto) : Promise<unknown> {
    const find = await this.prisma.todo.findUnique({
      where: {
        id: data.id
      }
    });
    if(find)
    {
      const res = await this.prisma.todo.update({
        where: {
          id: data.id
        },
        data: {
          sets: parseInt(data.sets),
          refs: parseInt(data.refs),
          weight: parseFloat(data.weights),
          bodyPart: data.body_parts,
          total: parseInt(data.total)
        }
      });
      return {
        status: true,
        type: 'success',
        message: 'Todo updated',
        code : HttpStatus.OK,
        data: res
      }
    }
    else
    {
      return {
        status: false,
        type: 'error',
        message: 'Todo not found',
        code : HttpStatus.NOT_FOUND,
      }
    }
  }

  async deleteTodo(data: deleteTodoDto) : Promise<unknown> {
    const find = await this.prisma.todo.findUnique({
      where: {
        id: data.id
      }
    });
    if(find)
    {
      await this.prisma.todo.delete({
        where: {
          id: data.id
        }
      });
      return {
        status: true,
        type: 'success',
        message: 'Todo deleted',
        code : HttpStatus.OK,
      }
    }
    else
    {
      return {
        status: false,
        type: 'error',
        message: 'Todo not found',
        code : HttpStatus.NOT_FOUND,
      }
    }
  }

  async addTodoToExercise(data: AddTodoToExerciseDto) : Promise<unknown> {
    const find_exercise = await this.prisma.exercises.findUnique({
      where: {
        id: data.exerciseId
      }
    });

    const find_todo = await this.prisma.todo.findUnique({
      where: {
        id: data.todoId
      }
    });

    if(!find_exercise)
    {
      return {
        status: false,
        type: 'error',
        message: 'Exercise not found',
        code : HttpStatus.NOT_FOUND,
      }
    }

    if(!find_todo)
    {
      return {
        status: false,
        type: 'error',
        message: 'Todo not found',
        code : HttpStatus.NOT_FOUND,
      }
    }

    const res = await this.prisma.exercisesTodo.create({
      data: {
        todos: {
          connect: {
            id: data.todoId
          }
        },
        exercises: {
          connect: {
            id: data.exerciseId
          }
        },
      }
    });
    
    return res;
  }
}
