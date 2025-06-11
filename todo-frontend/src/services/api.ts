import axios from 'axios';
import { Todo, CreateTodoDto, UpdateTodoDto } from '@/types/todo';

const API_BASE_URL = 'https://work-1-crmexbyyrgxcmdqj.prod-runtime.all-hands.dev/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoApi = {
  // Get all todos
  getTodos: async (): Promise<Todo[]> => {
    const response = await api.get('/todos');
    return response.data;
  },

  // Get a single todo
  getTodo: async (id: number): Promise<Todo> => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  // Create a new todo
  createTodo: async (todo: CreateTodoDto): Promise<Todo> => {
    const response = await api.post('/todos', todo);
    return response.data;
  },

  // Update a todo
  updateTodo: async (id: number, todo: UpdateTodoDto): Promise<Todo> => {
    const response = await api.patch(`/todos/${id}`, todo);
    return response.data;
  },

  // Toggle todo completion
  toggleTodo: async (id: number): Promise<Todo> => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
  },

  // Delete a todo
  deleteTodo: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};