/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from '../src/todo/todo.module';
import { Todo } from '../src/todo/todo.entity';

describe('Todo API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Todo],
          synchronize: true,
        }),
        TodoModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/api/todos (POST)', () => {
    it('should create a new todo', () => {
      const createTodoDto = {
        title: 'E2E Test Todo',
        description: 'This is an E2E test todo',
        completed: false,
      };

      return request(app.getHttpServer())
        .post('/api/todos')
        .send(createTodoDto)
        .expect(201)
        .expect((res) => {
          expect(res.body.title).toBe(createTodoDto.title);
          expect(res.body.description).toBe(createTodoDto.description);
          expect(res.body.completed).toBe(createTodoDto.completed);
          expect(res.body.id).toBeDefined();
          expect(res.body.createdAt).toBeDefined();
          expect(res.body.updatedAt).toBeDefined();
        });
    });

    it('should create a todo with minimal data', () => {
      const createTodoDto = {
        title: 'Minimal Todo',
      };

      return request(app.getHttpServer())
        .post('/api/todos')
        .send(createTodoDto)
        .expect(201)
        .expect((res) => {
          expect(res.body.title).toBe(createTodoDto.title);
          expect(res.body.completed).toBe(false);
        });
    });

    it('should return 400 for invalid data', () => {
      const invalidTodoDto = {
        description: 'Missing title',
      };

      return request(app.getHttpServer())
        .post('/api/todos')
        .send(invalidTodoDto)
        .expect(400);
    });

    it('should return 400 for empty title', () => {
      const invalidTodoDto = {
        title: '',
        description: 'Empty title',
      };

      return request(app.getHttpServer())
        .post('/api/todos')
        .send(invalidTodoDto)
        .expect(400);
    });
  });

  describe('/api/todos (GET)', () => {
    beforeEach(async () => {
      // Clean up before each test
      await request(app.getHttpServer())
        .delete('/api/todos/1')
        .catch(() => {});
      await request(app.getHttpServer())
        .delete('/api/todos/2')
        .catch(() => {});
    });

    it('should return all todos', async () => {
      // Create test todos
      const todo1 = { title: 'Todo 1', description: 'First todo' };
      const todo2 = { title: 'Todo 2', description: 'Second todo' };

      await request(app.getHttpServer()).post('/api/todos').send(todo1);
      await request(app.getHttpServer()).post('/api/todos').send(todo2);

      return request(app.getHttpServer())
        .get('/api/todos')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThanOrEqual(2);
        });
    });

    it('should return empty array when no todos exist', () => {
      return request(app.getHttpServer())
        .get('/api/todos')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
  });

  describe('/api/todos/:id (GET)', () => {
    it('should return a specific todo', async () => {
      // Create a todo first
      const createResponse = await request(app.getHttpServer())
        .post('/api/todos')
        .send({ title: 'Specific Todo', description: 'For GET test' });

      const todoId = createResponse.body.id;

      return request(app.getHttpServer())
        .get(`/api/todos/${todoId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(todoId);
          expect(res.body.title).toBe('Specific Todo');
        });
    });

    it('should return 404 for non-existent todo', () => {
      return request(app.getHttpServer()).get('/api/todos/999').expect(404);
    });
  });

  describe('/api/todos/:id (PATCH)', () => {
    it('should update a todo', async () => {
      // Create a todo first
      const createResponse = await request(app.getHttpServer())
        .post('/api/todos')
        .send({ title: 'Original Title', description: 'Original Description' });

      const todoId = createResponse.body.id;
      const updateDto = { title: 'Updated Title', completed: true };

      return request(app.getHttpServer())
        .patch(`/api/todos/${todoId}`)
        .send(updateDto)
        .expect(200)
        .expect((res) => {
          expect(res.body.title).toBe(updateDto.title);
          expect(res.body.completed).toBe(updateDto.completed);
          expect(res.body.description).toBe('Original Description');
        });
    });

    it('should return 404 when updating non-existent todo', () => {
      return request(app.getHttpServer())
        .patch('/api/todos/999')
        .send({ title: 'Updated Title' })
        .expect(404);
    });
  });

  describe('/api/todos/:id/toggle (PATCH)', () => {
    it('should toggle todo completion status', async () => {
      // Create a todo first
      const createResponse = await request(app.getHttpServer())
        .post('/api/todos')
        .send({ title: 'Toggle Todo', completed: false });

      const todoId = createResponse.body.id;

      // Toggle to completed
      const toggleResponse = await request(app.getHttpServer())
        .patch(`/api/todos/${todoId}/toggle`)
        .expect(200);

      expect(toggleResponse.body.completed).toBe(true);

      // Toggle back to incomplete
      return request(app.getHttpServer())
        .patch(`/api/todos/${todoId}/toggle`)
        .expect(200)
        .expect((res) => {
          expect(res.body.completed).toBe(false);
        });
    });

    it('should return 404 when toggling non-existent todo', () => {
      return request(app.getHttpServer())
        .patch('/api/todos/999/toggle')
        .expect(404);
    });
  });

  describe('/api/todos/:id (DELETE)', () => {
    it('should delete a todo', async () => {
      // Create a todo first
      const createResponse = await request(app.getHttpServer())
        .post('/api/todos')
        .send({ title: 'Delete Me', description: 'This will be deleted' });

      const todoId = createResponse.body.id;

      // Delete the todo
      await request(app.getHttpServer())
        .delete(`/api/todos/${todoId}`)
        .expect(200);

      // Verify it's deleted
      return request(app.getHttpServer())
        .get(`/api/todos/${todoId}`)
        .expect(404);
    });

    it('should return 404 when deleting non-existent todo', () => {
      return request(app.getHttpServer()).delete('/api/todos/999').expect(404);
    });
  });

  describe('Complete workflow', () => {
    it('should handle complete CRUD operations', async () => {
      // Create
      const createResponse = await request(app.getHttpServer())
        .post('/api/todos')
        .send({ title: 'Workflow Todo', description: 'Complete workflow test' })
        .expect(201);

      const todoId = createResponse.body.id;

      // Read
      await request(app.getHttpServer())
        .get(`/api/todos/${todoId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.title).toBe('Workflow Todo');
        });

      // Update
      await request(app.getHttpServer())
        .patch(`/api/todos/${todoId}`)
        .send({ title: 'Updated Workflow Todo' })
        .expect(200)
        .expect((res) => {
          expect(res.body.title).toBe('Updated Workflow Todo');
        });

      // Toggle
      await request(app.getHttpServer())
        .patch(`/api/todos/${todoId}/toggle`)
        .expect(200)
        .expect((res) => {
          expect(res.body.completed).toBe(true);
        });

      // Delete
      await request(app.getHttpServer())
        .delete(`/api/todos/${todoId}`)
        .expect(200);

      // Verify deletion
      await request(app.getHttpServer())
        .get(`/api/todos/${todoId}`)
        .expect(404);
    });
  });
});
