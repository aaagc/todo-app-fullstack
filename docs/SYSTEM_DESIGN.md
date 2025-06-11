# Todo App - System Design Document

## Overview

The Todo App is a full-stack web application built with a modern architecture using NestJS for the backend and Next.js with Chakra UI for the frontend. The application provides a complete task management system with CRUD operations, filtering, and search capabilities.

## Architecture

### High-Level Architecture

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│                 │ ◄─────────────────► │                 │
│   Frontend      │                     │   Backend       │
│   (Next.js)     │                     │   (NestJS)      │
│   Port: 12001   │                     │   Port: 12000   │
│                 │                     │                 │
└─────────────────┘                     └─────────────────┘
                                                  │
                                                  │ TypeORM
                                                  ▼
                                        ┌─────────────────┐
                                        │                 │
                                        │   Database      │
                                        │   (SQLite)      │
                                        │                 │
                                        └─────────────────┘
```

### Technology Stack

#### Backend
- **Framework**: NestJS (Node.js framework)
- **Database**: SQLite with TypeORM
- **Validation**: class-validator, class-transformer
- **API**: RESTful API with JSON responses
- **CORS**: Enabled for cross-origin requests

#### Frontend
- **Framework**: Next.js 14 with TypeScript
- **UI Library**: Chakra UI v2.10.9
- **Icons**: React Icons
- **HTTP Client**: Axios
- **Styling**: Emotion (CSS-in-JS)

## System Components

### Backend Components

#### 1. Todo Entity
```typescript
@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

#### 2. Data Transfer Objects (DTOs)
- **CreateTodoDto**: Validation for creating todos
- **UpdateTodoDto**: Validation for updating todos

#### 3. Service Layer
- **TodoService**: Business logic for CRUD operations
- Database interactions through TypeORM repository pattern

#### 4. Controller Layer
- **TodoController**: HTTP request handling
- RESTful endpoints with proper HTTP status codes

#### 5. Database Configuration
- SQLite database with TypeORM
- Automatic synchronization in development
- Entity auto-loading

### Frontend Components

#### 1. Page Components
- **Home Page**: Main todo management interface

#### 2. Feature Components
- **TodoList**: Container for todo items with filtering and search
- **TodoItem**: Individual todo display with actions
- **TodoForm**: Modal form for creating/editing todos

#### 3. Services
- **todoService**: API communication layer using Axios

#### 4. Types
- **Todo**: TypeScript interface matching backend entity
- **CreateTodoDto**: Frontend DTO for API requests

## Data Flow

### 1. Todo Creation Flow
```
User Input → TodoForm → Validation → API Call → Backend Service → Database → Response → UI Update
```

### 2. Todo Retrieval Flow
```
Page Load → API Call → Backend Service → Database Query → Response → TodoList Render
```

### 3. Todo Update Flow
```
User Action → TodoForm/TodoItem → API Call → Backend Service → Database Update → Response → UI Refresh
```

### 4. Todo Deletion Flow
```
Delete Button → Confirmation → API Call → Backend Service → Database Delete → Response → UI Update
```

## Database Design

### Todo Table Schema
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

### Indexes
- Primary key on `id`
- Potential indexes on `completed` and `createdAt` for filtering performance

## Security Considerations

### Backend Security
- Input validation using class-validator
- SQL injection prevention through TypeORM parameterized queries
- CORS configuration for allowed origins
- Global validation pipe for all endpoints

### Frontend Security
- TypeScript for type safety
- Input sanitization through Chakra UI components
- Axios interceptors for consistent error handling

## Performance Considerations

### Backend Performance
- Efficient database queries through TypeORM
- Lightweight SQLite for development/small-scale deployment
- Minimal data transfer with focused DTOs

### Frontend Performance
- Next.js optimizations (SSR, code splitting)
- Chakra UI component optimization
- Efficient state management with React hooks
- Real-time UI updates without unnecessary re-renders

## Scalability Considerations

### Current Architecture Limitations
- SQLite is suitable for development and small-scale deployment
- Single-instance application without clustering

### Future Scalability Options
- **Database**: Migrate to PostgreSQL/MySQL for production
- **Caching**: Implement Redis for session management and caching
- **Load Balancing**: Add load balancer for multiple backend instances
- **CDN**: Implement CDN for static assets
- **Microservices**: Split into smaller services as features grow

## Deployment Architecture

### Development Environment
- Backend: `npm run start:dev` on port 12000
- Frontend: `npm run dev` on port 12001
- Database: Local SQLite file

### Production Considerations
- **Backend**: PM2 or Docker containers
- **Frontend**: Static build deployment (Vercel, Netlify)
- **Database**: Managed database service (AWS RDS, Google Cloud SQL)
- **Environment Variables**: Secure configuration management

## Monitoring and Logging

### Current Implementation
- Basic console logging in development
- Error handling with try-catch blocks

### Production Recommendations
- **Logging**: Winston or similar structured logging
- **Monitoring**: Application performance monitoring (APM)
- **Health Checks**: Endpoint health monitoring
- **Error Tracking**: Sentry or similar error tracking service

## API Design Principles

### RESTful Design
- Resource-based URLs (`/api/todos`)
- HTTP methods for operations (GET, POST, PUT, DELETE)
- Consistent response formats
- Proper HTTP status codes

### Error Handling
- Standardized error response format
- Validation error details
- Appropriate HTTP status codes

### Data Validation
- Server-side validation for all inputs
- Client-side validation for user experience
- Consistent validation rules between frontend and backend

## Future Enhancements

### Planned Features
1. **User Authentication**: JWT-based authentication system
2. **Todo Categories**: Organize todos into categories
3. **Due Dates**: Add deadline functionality
4. **Priority Levels**: High, medium, low priority system
5. **Attachments**: File upload capability
6. **Collaboration**: Share todos with other users
7. **Notifications**: Email/push notifications for due dates
8. **Mobile App**: React Native mobile application

### Technical Improvements
1. **Testing**: Comprehensive unit and integration tests
2. **CI/CD**: Automated testing and deployment pipeline
3. **Documentation**: OpenAPI/Swagger documentation
4. **Performance**: Database optimization and caching
5. **Security**: Enhanced security measures and audit logging