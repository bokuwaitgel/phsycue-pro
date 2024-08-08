import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
    @IsNotEmpty()
    @ApiProperty()
    title: string;
    @IsNotEmpty()
    @ApiProperty()
    description: string;
    // @IsNotEmpty()
    @ApiProperty()
    image: string;
    // @IsNotEmpty()
    @ApiProperty()
    video: string;
    @IsNotEmpty()
    @ApiProperty()
    refs: number;
    @IsNotEmpty()
    @ApiProperty()
    sets: number;
    @IsNotEmpty()
    @ApiProperty()
    weights: number;
    @IsNotEmpty()
    @ApiProperty()
    body_parts: string;
    @IsNotEmpty()
    @ApiProperty()
    total: number;
    @IsNotEmpty()
    @ApiProperty()
    teacherId: string;

}

export class UpdateTodoDto {
    @IsNotEmpty()
    @ApiProperty()
    title: string;
    @IsNotEmpty()
    @ApiProperty()
    description: string;
    // @IsNotEmpty()
    @ApiProperty()
    image: string;
    // @IsNotEmpty()
    @ApiProperty()
    video: string;
    @IsNotEmpty()
    @ApiProperty()
    id: string;
    @IsNotEmpty()
    @ApiProperty()
    refs: number;
    @IsNotEmpty()
    @ApiProperty()
    sets: number;
    @IsNotEmpty()
    @ApiProperty()
    weights: number;
    @IsNotEmpty()
    @ApiProperty()
    body_parts: string;
    @IsNotEmpty()
    @ApiProperty()
    total: number;
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
