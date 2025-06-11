import { IsString, IsOptional, IsBoolean, IsNumber, IsDateString } from 'class-validator';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export class CreateTodoDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}

export class TodoResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  completed: boolean;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}

export interface TodoFilters {
  status?: 'all' | 'active' | 'completed';
  search?: string;
}

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  completionRate: number;
}