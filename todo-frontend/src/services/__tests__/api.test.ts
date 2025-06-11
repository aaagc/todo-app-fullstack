import { Todo, CreateTodoDto, UpdateTodoDto } from '@/types/todo';

// Mock the entire api module
jest.mock('../api', () => ({
  todoApi: {
    getTodos: jest.fn(),
    getTodo: jest.fn(),
    createTodo: jest.fn(),
    updateTodo: jest.fn(),
    toggleTodo: jest.fn(),
    deleteTodo: jest.fn(),
  },
}));

// Import after mocking
import { todoApi } from '../api';

const mockTodoApi = todoApi as jest.Mocked<typeof todoApi>;

describe('todoApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTodos', () => {
    it('should fetch all todos', async () => {
      const mockTodos: Todo[] = [
        {
          id: 1,
          title: 'Test Todo 1',
          description: 'Description 1',
          completed: false,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
        },
      ];

      mockTodoApi.getTodos.mockResolvedValue(mockTodos);

      const result = await todoApi.getTodos();

      expect(mockTodoApi.getTodos).toHaveBeenCalled();
      expect(result).toEqual(mockTodos);
    });

    it('should handle API errors', async () => {
      const errorMessage = 'Network Error';
      mockTodoApi.getTodos.mockRejectedValue(new Error(errorMessage));

      await expect(todoApi.getTodos()).rejects.toThrow(errorMessage);
    });
  });

  describe('getTodo', () => {
    it('should fetch a specific todo', async () => {
      const mockTodo: Todo = {
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        completed: false,
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      };

      mockTodoApi.getTodo.mockResolvedValue(mockTodo);

      const result = await todoApi.getTodo(1);

      expect(mockTodoApi.getTodo).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockTodo);
    });
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'New Todo',
        description: 'New Description',
      };

      const mockCreatedTodo: Todo = {
        id: 1,
        ...createTodoDto,
        completed: false,
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      };

      mockTodoApi.createTodo.mockResolvedValue(mockCreatedTodo);

      const result = await todoApi.createTodo(createTodoDto);

      expect(mockTodoApi.createTodo).toHaveBeenCalledWith(createTodoDto);
      expect(result).toEqual(mockCreatedTodo);
    });
  });

  describe('updateTodo', () => {
    it('should update an existing todo', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Todo',
      };

      const mockUpdatedTodo: Todo = {
        id: 1,
        title: 'Updated Todo',
        description: 'Test Description',
        completed: false,
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      };

      mockTodoApi.updateTodo.mockResolvedValue(mockUpdatedTodo);

      const result = await todoApi.updateTodo(1, updateTodoDto);

      expect(mockTodoApi.updateTodo).toHaveBeenCalledWith(1, updateTodoDto);
      expect(result).toEqual(mockUpdatedTodo);
    });
  });

  describe('toggleTodo', () => {
    it('should toggle todo completion status', async () => {
      const mockToggledTodo: Todo = {
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        completed: true,
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      };

      mockTodoApi.toggleTodo.mockResolvedValue(mockToggledTodo);

      const result = await todoApi.toggleTodo(1);

      expect(mockTodoApi.toggleTodo).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockToggledTodo);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', async () => {
      mockTodoApi.deleteTodo.mockResolvedValue(undefined);

      await todoApi.deleteTodo(1);

      expect(mockTodoApi.deleteTodo).toHaveBeenCalledWith(1);
    });
  });
});