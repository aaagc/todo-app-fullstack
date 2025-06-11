import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

describe('TodoController', () => {
  let controller: TodoController;

  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  };

  const mockTodoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    toggleComplete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
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

      mockTodoService.create.mockResolvedValue(mockTodo);

      const result = await controller.create(createTodoDto);

      expect(mockTodoService.create).toHaveBeenCalledWith(createTodoDto);
      expect(result).toEqual(mockTodo);
    });

    it('should handle creation with minimal data', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'Minimal Todo',
      };

      const minimalTodo = {
        ...mockTodo,
        title: 'Minimal Todo',
        description: undefined,
      };
      mockTodoService.create.mockResolvedValue(minimalTodo);

      const result = await controller.create(createTodoDto);

      expect(mockTodoService.create).toHaveBeenCalledWith(createTodoDto);
      expect(result).toEqual(minimalTodo);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const todos = [mockTodo];
      mockTodoService.findAll.mockResolvedValue(todos);

      const result = await controller.findAll();

      expect(mockTodoService.findAll).toHaveBeenCalled();
      expect(result).toEqual(todos);
    });

    it('should return empty array when no todos exist', async () => {
      mockTodoService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a specific todo', async () => {
      mockTodoService.findOne.mockResolvedValue(mockTodo);

      const result = await controller.findOne(1);

      expect(mockTodoService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockTodo);
    });

    it('should handle string id parameter', async () => {
      mockTodoService.findOne.mockResolvedValue(mockTodo);

      // The ParseIntPipe should convert string to number
      const result = await controller.findOne(1);

      expect(mockTodoService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockTodo);
    });
  });

  describe('update', () => {
    it('should update and return the todo', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Title',
        completed: true,
      };

      const updatedTodo = { ...mockTodo, ...updateTodoDto };
      mockTodoService.update.mockResolvedValue(updatedTodo);

      const result = await controller.update(1, updateTodoDto);

      expect(mockTodoService.update).toHaveBeenCalledWith(1, updateTodoDto);
      expect(result).toEqual(updatedTodo);
    });

    it('should handle partial updates', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Only Title Updated',
      };

      const updatedTodo = { ...mockTodo, title: 'Only Title Updated' };
      mockTodoService.update.mockResolvedValue(updatedTodo);

      const result = await controller.update(1, updateTodoDto);

      expect(mockTodoService.update).toHaveBeenCalledWith(1, updateTodoDto);
      expect(result).toEqual(updatedTodo);
    });
  });

  describe('toggleComplete', () => {
    it('should toggle completion status', async () => {
      const toggledTodo = { ...mockTodo, completed: true };
      mockTodoService.toggleComplete.mockResolvedValue(toggledTodo);

      const result = await controller.toggleComplete(1);

      expect(mockTodoService.toggleComplete).toHaveBeenCalledWith(1);
      expect(result).toEqual(toggledTodo);
    });
  });

  describe('remove', () => {
    it('should remove the todo', async () => {
      mockTodoService.remove.mockResolvedValue(undefined);

      const result = await controller.remove(1);

      expect(mockTodoService.remove).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  });
});
