import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodoService', () => {
  let service: TodoService;
  let repository: Repository<Todo>;

  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    repository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'New Todo',
        description: 'New Description',
        completed: false,
      };

      mockRepository.create.mockReturnValue(mockTodo);
      mockRepository.save.mockResolvedValue(mockTodo);

      const result = await service.create(createTodoDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createTodoDto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockTodo);
      expect(result).toEqual(mockTodo);
    });

    it('should create a todo with default completed value', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'New Todo',
        description: 'New Description',
      };

      mockRepository.create.mockReturnValue(mockTodo);
      mockRepository.save.mockResolvedValue(mockTodo);

      await service.create(createTodoDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createTodoDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos ordered by creation date', async () => {
      const todos = [mockTodo];
      mockRepository.find.mockResolvedValue(todos);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual(todos);
    });

    it('should return empty array when no todos exist', async () => {
      mockRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a todo by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockTodo);

      const result = await service.findOne(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockTodo);
    });

    it('should throw NotFoundException when todo not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(
        new NotFoundException('Todo with ID 999 not found'),
      );
    });
  });

  describe('update', () => {
    it('should update and return the todo', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Title',
        completed: true,
      };

      const updatedTodo = { ...mockTodo, ...updateTodoDto };

      mockRepository.findOne.mockResolvedValue(mockTodo);
      mockRepository.save.mockResolvedValue(updatedTodo);

      const result = await service.update(1, updateTodoDto);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(updateTodoDto),
      );
      expect(result).toEqual(updatedTodo);
    });

    it('should throw NotFoundException when updating non-existent todo', async () => {
      const updateTodoDto: UpdateTodoDto = { title: 'Updated Title' };
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update(999, updateTodoDto)).rejects.toThrow(
        new NotFoundException('Todo with ID 999 not found'),
      );
    });
  });

  describe('remove', () => {
    it('should remove the todo', async () => {
      mockRepository.findOne.mockResolvedValue(mockTodo);
      mockRepository.remove.mockResolvedValue(mockTodo);

      await service.remove(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepository.remove).toHaveBeenCalledWith(mockTodo);
    });

    it('should throw NotFoundException when removing non-existent todo', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(
        new NotFoundException('Todo with ID 999 not found'),
      );
    });
  });

  describe('toggleComplete', () => {
    it('should toggle completion status from false to true', async () => {
      const todoToToggle = { ...mockTodo };
      const toggledResult = { ...mockTodo, completed: true };

      jest.spyOn(service, 'findOne').mockResolvedValue(todoToToggle);
      mockRepository.save.mockResolvedValue(toggledResult);

      const result = await service.toggleComplete(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual(toggledResult);
    });

    it('should toggle completion status from true to false', async () => {
      const completedTodo = { ...mockTodo, completed: true };
      const toggledResult = { ...mockTodo, completed: false };

      jest.spyOn(service, 'findOne').mockResolvedValue(completedTodo);
      mockRepository.save.mockResolvedValue(toggledResult);

      const result = await service.toggleComplete(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual(toggledResult);
    });

    it('should throw NotFoundException when toggling non-existent todo', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(
        new NotFoundException('Todo with ID 999 not found'),
      );

      await expect(service.toggleComplete(999)).rejects.toThrow(
        new NotFoundException('Todo with ID 999 not found'),
      );
    });
  });
});