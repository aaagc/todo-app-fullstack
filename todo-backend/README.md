# Todo Backend - NestJS API Server

A robust, scalable backend API built with NestJS, TypeORM, and SQLite for the Todo application. This backend provides a complete RESTful API with comprehensive validation, error handling, and database management.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run start:dev

# Server will be available at http://localhost:12000
```

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Development](#-development)
- [API Documentation](#-api-documentation)
- [Database](#-database)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### Core API Features
- ✅ **Complete CRUD Operations** - Create, Read, Update, Delete todos
- ✅ **Input Validation** - Comprehensive validation using class-validator
- ✅ **Error Handling** - Structured error responses with proper HTTP codes
- ✅ **CORS Support** - Configured for cross-origin requests
- ✅ **TypeScript** - Full type safety throughout the application

### Database Features
- ✅ **TypeORM Integration** - Type-safe database operations
- ✅ **SQLite Database** - Lightweight, file-based database for development
- ✅ **Auto-migrations** - Automatic schema synchronization
- ✅ **Entity Relationships** - Well-structured data models

### Development Features
- ✅ **Hot Reload** - Instant server restart on code changes
- ✅ **Environment Configuration** - Flexible configuration management
- ✅ **Logging** - Comprehensive logging for debugging
- ✅ **API Prefix** - Clean API routing with `/api` prefix

## 🛠 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **NestJS** | Node.js framework | ^10.0.0 |
| **TypeORM** | Database ORM | ^0.3.17 |
| **SQLite3** | Database | ^5.1.6 |
| **class-validator** | Input validation | ^0.14.0 |
| **class-transformer** | Data transformation | ^0.5.1 |
| **TypeScript** | Type safety | ^5.1.3 |

## 📁 Project Structure

```
todo-backend/
├── 📂 src/
│   ├── 📂 todos/                    # Todo module
│   │   ├── 📄 todo.entity.ts        # Database entity definition
│   │   ├── 📄 todo.dto.ts           # Data Transfer Objects
│   │   ├── 📄 todo.service.ts       # Business logic layer
│   │   ├── 📄 todo.controller.ts    # HTTP request handlers
│   │   └── 📄 todo.module.ts        # Module configuration
│   ├── 📄 app.module.ts             # Root application module
│   └── 📄 main.ts                   # Application entry point
├── 📂 test/                         # Test files
├── 📄 package.json                  # Dependencies and scripts
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 nest-cli.json                 # NestJS CLI configuration
└── 📄 todos.db                      # SQLite database file
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation Steps

1. **Clone and navigate to backend directory**
   ```bash
   cd todo-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup** (optional)
   ```bash
   # Create .env file for custom configuration
   cp .env.example .env
   ```

4. **Database initialization**
   ```bash
   # Database will be created automatically on first run
   # SQLite file: todos.db
   ```

## 🚀 Development

### Available Scripts

```bash
# Development with hot reload
npm run start:dev

# Production build
npm run build

# Start production server
npm run start:prod

# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Lint code
npm run lint

# Format code
npm run format
```

### Development Server

```bash
npm run start:dev
```

The server will start on `http://localhost:12000` with the following features:
- 🔄 **Hot reload** - Automatic restart on file changes
- 📝 **Detailed logging** - Request/response logging in development
- 🔍 **Error stack traces** - Full error details for debugging

### Environment Configuration

Create a `.env` file for custom configuration:

```env
# Database
DATABASE_PATH=./todos.db

# Server
PORT=12000
API_PREFIX=api

# CORS
CORS_ORIGIN=http://localhost:12001
```

## 📚 API Documentation

### Base URL
```
http://localhost:12000/api
```

### Endpoints Overview

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/todos` | Get all todos | ✅ |
| GET | `/todos/:id` | Get todo by ID | ✅ |
| POST | `/todos` | Create new todo | ✅ |
| PUT | `/todos/:id` | Update todo | ✅ |
| DELETE | `/todos/:id` | Delete todo | ✅ |

### Request/Response Examples

#### Create Todo
```bash
curl -X POST http://localhost:12000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn NestJS",
    "description": "Complete the NestJS tutorial",
    "completed": false
  }'
```

#### Response
```json
{
  "id": 1,
  "title": "Learn NestJS",
  "description": "Complete the NestJS tutorial",
  "completed": false,
  "createdAt": "2025-06-11T00:00:00.000Z",
  "updatedAt": "2025-06-11T00:00:00.000Z"
}
```

### Data Models

#### Todo Entity
```typescript
interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### CreateTodoDto
```typescript
interface CreateTodoDto {
  title: string;        // Required, min length: 1
  description?: string; // Optional
  completed?: boolean;  // Optional, default: false
}
```

For complete API documentation, see [API Specification](../docs/API_SPECIFICATION.md).

## 🗄 Database

### SQLite Configuration

The application uses SQLite with TypeORM for data persistence:

```typescript
// Database configuration
TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'todos.db',
  entities: [Todo],
  synchronize: true, // Auto-sync in development
  logging: true,     // SQL query logging
})
```

### Entity Schema

```sql
CREATE TABLE todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR NOT NULL,
    description VARCHAR,
    completed BOOLEAN DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Database Operations

```typescript
// Service layer examples
async findAll(): Promise<Todo[]> {
  return this.todoRepository.find();
}

async create(createTodoDto: CreateTodoDto): Promise<Todo> {
  const todo = this.todoRepository.create(createTodoDto);
  return this.todoRepository.save(todo);
}
```

## 🧪 Testing

### Test Structure
```
test/
├── 📄 app.e2e-spec.ts          # End-to-end tests
└── 📄 jest-e2e.json            # E2E test configuration
```

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### Test Examples

```typescript
describe('TodoController', () => {
  it('should create a todo', async () => {
    const createTodoDto = {
      title: 'Test Todo',
      description: 'Test Description'
    };
    
    const result = await controller.create(createTodoDto);
    expect(result.title).toBe('Test Todo');
  });
});
```

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Environment Variables

```env
# Production environment
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:port/db
CORS_ORIGIN=https://yourdomain.com
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/
EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

### Database Migration

For production, consider migrating to PostgreSQL:

```typescript
// Production database config
{
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Todo],
  synchronize: false, // Use migrations in production
  migrations: ['dist/migrations/*.js'],
}
```

## 🤝 Contributing

### Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/new-endpoint
   ```

2. **Make changes and test**
   ```bash
   npm run test
   npm run lint
   ```

3. **Commit changes**
   ```bash
   git commit -m "feat: add new endpoint for todo categories"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/new-endpoint
   ```

### Code Standards

- **TypeScript**: Use strict type checking
- **ESLint**: Follow configured linting rules
- **Prettier**: Use for code formatting
- **Conventional Commits**: Use conventional commit messages

### Adding New Features

1. **Create new module**
   ```bash
   nest generate module feature-name
   nest generate controller feature-name
   nest generate service feature-name
   ```

2. **Add entity and DTOs**
   ```typescript
   // feature.entity.ts
   @Entity()
   export class Feature {
     @PrimaryGeneratedColumn()
     id: number;
   }
   ```

3. **Update module imports**
   ```typescript
   @Module({
     imports: [TypeOrmModule.forFeature([Feature])],
     controllers: [FeatureController],
     providers: [FeatureService],
   })
   export class FeatureModule {}
   ```

## 🔧 Troubleshooting

### Common Issues

#### Database Connection Error
```bash
# Check if database file exists
ls -la todos.db

# Reset database
rm todos.db
npm run start:dev
```

#### Port Already in Use
```bash
# Find process using port 12000
lsof -i :12000

# Kill process
kill -9 <PID>
```

#### TypeORM Sync Issues
```bash
# Clear database and restart
rm todos.db
npm run start:dev
```

### Debug Mode

```bash
# Start with debug logging
DEBUG=* npm run start:dev

# Or use NestJS debug
npm run start:debug
```

## 📞 Support

- **Documentation**: [System Design](../docs/SYSTEM_DESIGN.md)
- **API Reference**: [API Specification](../docs/API_SPECIFICATION.md)
- **Issues**: Create GitHub issues for bugs or feature requests
- **Discussions**: Use GitHub discussions for questions

## 🎯 Next Steps

### Immediate Improvements
- [ ] Add comprehensive unit tests
- [ ] Implement API documentation with Swagger
- [ ] Add request/response logging middleware
- [ ] Implement rate limiting

### Future Enhancements
- [ ] User authentication with JWT
- [ ] Database migrations for production
- [ ] Caching with Redis
- [ ] WebSocket support for real-time updates
- [ ] File upload capabilities
- [ ] Background job processing

---

**Happy coding! 🚀**

For questions or contributions, please refer to the main project documentation or create an issue.