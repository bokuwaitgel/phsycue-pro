import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
    @IsNotEmpty()
    @ApiProperty()
    refs: string;
    @IsNotEmpty()
    @ApiProperty()
    sets: string;
    @IsNotEmpty()
    @ApiProperty()
    weights: string;
    @IsNotEmpty()
    @ApiProperty()
    body_parts: string;
    @IsNotEmpty()
    @ApiProperty()
    total: string;
    @IsNotEmpty()
    @ApiProperty()
    teacherId: string;

}

export class UpdateTodoDto {
    @IsNotEmpty()
    @ApiProperty()
    id: string;
    @IsNotEmpty()
    @ApiProperty()
    refs: string;
    @IsNotEmpty()
    @ApiProperty()
    sets: string;
    @IsNotEmpty()
    @ApiProperty()
    weights: string;
    @IsNotEmpty()
    @ApiProperty()
    body_parts: string;
    @IsNotEmpty()
    @ApiProperty()
    total: string;
}

export class deleteTodoDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}

export class getTodoByIdDto {
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}

export class AddTodoToExerciseDto {
  @IsNotEmpty()
  @ApiProperty()
  exerciseId: string;
  @IsNotEmpty()
  @ApiProperty()
  todoId: string;
}
