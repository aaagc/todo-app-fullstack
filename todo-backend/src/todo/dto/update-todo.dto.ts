import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}