# Todo App - API Specification

## Overview

This document describes the REST API for the Todo App backend service. The API provides endpoints for managing todo items with full CRUD operations.

## Base Information

- **Base URL**: `http://localhost:12000/api`
- **Content-Type**: `application/json`
- **API Version**: v1
- **Protocol**: HTTP/HTTPS

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

## Common Response Format

### Success Response
```json
{
  "data": <response_data>,
  "message": "Success message (optional)"
}
```

### Error Response
```json
{
  "statusCode": <http_status_code>,
  "message": "<error_message>",
  "error": "<error_type>",
  "timestamp": "<iso_timestamp>",
  "path": "<request_path>"
}
```

## Data Models

### Todo Entity
```typescript
interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
}
```

### CreateTodoDto
```typescript
interface CreateTodoDto {
  title: string;        // Required, min length: 1
  description?: string; // Optional
  completed?: boolean;  // Optional, default: false
}
```

### UpdateTodoDto
```typescript
interface UpdateTodoDto {
  title?: string;       // Optional, min length: 1 if provided
  description?: string; // Optional
  completed?: boolean;  // Optional
}
```

## API Endpoints

### 1. Get All Todos

Retrieves all todo items from the database.

**Endpoint**: `GET /api/todos`

**Parameters**: None

**Response**:
- **Status Code**: `200 OK`
- **Body**:
```json
[
  {
    "id": 1,
    "title": "Sample Todo",
    "description": "This is a sample todo item",
    "completed": false,
    "createdAt": "2025-06-11T00:00:00.000Z",
    "updatedAt": "2025-06-11T00:00:00.000Z"
  }
]
```

**Example Request**:
```bash
curl -X GET http://localhost:12000/api/todos
```

### 2. Get Todo by ID

Retrieves a specific todo item by its ID.

**Endpoint**: `GET /api/todos/:id`

**Parameters**:
- `id` (path parameter): Todo ID (integer)

**Response**:
- **Status Code**: `200 OK`
- **Body**:
```json
{
  "id": 1,
  "title": "Sample Todo",
  "description": "This is a sample todo item",
  "completed": false,
  "createdAt": "2025-06-11T00:00:00.000Z",
  "updatedAt": "2025-06-11T00:00:00.000Z"
}
```

**Error Responses**:
- **Status Code**: `404 Not Found`
```json
{
  "statusCode": 404,
  "message": "Todo with ID 999 not found",
  "error": "Not Found",
  "timestamp": "2025-06-11T00:00:00.000Z",
  "path": "/api/todos/999"
}
```

**Example Request**:
```bash
curl -X GET http://localhost:12000/api/todos/1
```

### 3. Create Todo

Creates a new todo item.

**Endpoint**: `POST /api/todos`

**Request Body**:
```json
{
  "title": "New Todo",
  "description": "Optional description",
  "completed": false
}
```

**Response**:
- **Status Code**: `201 Created`
- **Body**:
```json
{
  "id": 2,
  "title": "New Todo",
  "description": "Optional description",
  "completed": false,
  "createdAt": "2025-06-11T00:00:00.000Z",
  "updatedAt": "2025-06-11T00:00:00.000Z"
}
```

**Validation Rules**:
- `title`: Required, minimum length 1 character
- `description`: Optional string
- `completed`: Optional boolean, defaults to `false`

**Error Responses**:
- **Status Code**: `400 Bad Request` (Validation Error)
```json
{
  "statusCode": 400,
  "message": [
    "title should not be empty",
    "title must be a string"
  ],
  "error": "Bad Request",
  "timestamp": "2025-06-11T00:00:00.000Z",
  "path": "/api/todos"
}
```

**Example Request**:
```bash
curl -X POST http://localhost:12000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn NestJS",
    "description": "Complete the NestJS tutorial",
    "completed": false
  }'
```

### 4. Update Todo

Updates an existing todo item.

**Endpoint**: `PUT /api/todos/:id`

**Parameters**:
- `id` (path parameter): Todo ID (integer)

**Request Body**:
```json
{
  "title": "Updated Todo Title",
  "description": "Updated description",
  "completed": true
}
```

**Response**:
- **Status Code**: `200 OK`
- **Body**:
```json
{
  "id": 1,
  "title": "Updated Todo Title",
  "description": "Updated description",
  "completed": true,
  "createdAt": "2025-06-11T00:00:00.000Z",
  "updatedAt": "2025-06-11T00:30:00.000Z"
}
```

**Validation Rules**:
- `title`: Optional, minimum length 1 character if provided
- `description`: Optional string
- `completed`: Optional boolean

**Error Responses**:
- **Status Code**: `404 Not Found`
```json
{
  "statusCode": 404,
  "message": "Todo with ID 999 not found",
  "error": "Not Found",
  "timestamp": "2025-06-11T00:00:00.000Z",
  "path": "/api/todos/999"
}
```

- **Status Code**: `400 Bad Request` (Validation Error)
```json
{
  "statusCode": 400,
  "message": [
    "title should not be empty"
  ],
  "error": "Bad Request",
  "timestamp": "2025-06-11T00:00:00.000Z",
  "path": "/api/todos/1"
}
```

**Example Request**:
```bash
curl -X PUT http://localhost:12000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Todo",
    "completed": true
  }'
```

### 5. Delete Todo

Deletes a todo item by its ID.

**Endpoint**: `DELETE /api/todos/:id`

**Parameters**:
- `id` (path parameter): Todo ID (integer)

**Response**:
- **Status Code**: `200 OK`
- **Body**:
```json
{
  "message": "Todo deleted successfully"
}
```

**Error Responses**:
- **Status Code**: `404 Not Found`
```json
{
  "statusCode": 404,
  "message": "Todo with ID 999 not found",
  "error": "Not Found",
  "timestamp": "2025-06-11T00:00:00.000Z",
  "path": "/api/todos/999"
}
```

**Example Request**:
```bash
curl -X DELETE http://localhost:12000/api/todos/1
```

## HTTP Status Codes

The API uses the following HTTP status codes:

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data or validation error |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

## Error Handling

### Validation Errors

When request data fails validation, the API returns a `400 Bad Request` status with detailed error messages:

```json
{
  "statusCode": 400,
  "message": [
    "title should not be empty",
    "title must be a string"
  ],
  "error": "Bad Request",
  "timestamp": "2025-06-11T00:00:00.000Z",
  "path": "/api/todos"
}
```

### Not Found Errors

When a requested resource is not found, the API returns a `404 Not Found` status:

```json
{
  "statusCode": 404,
  "message": "Todo with ID 999 not found",
  "error": "Not Found",
  "timestamp": "2025-06-11T00:00:00.000Z",
  "path": "/api/todos/999"
}
```

### Server Errors

For unexpected server errors, the API returns a `500 Internal Server Error` status:

```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error",
  "timestamp": "2025-06-11T00:00:00.000Z",
  "path": "/api/todos"
}
```

## CORS Configuration

The API is configured to accept requests from any origin with the following CORS settings:

- **Allowed Origins**: `*` (all origins)
- **Allowed Methods**: `GET, POST, PUT, DELETE, OPTIONS`
- **Allowed Headers**: `Content-Type, Authorization`

## Rate Limiting

Currently, no rate limiting is implemented. For production deployment, consider implementing rate limiting to prevent abuse.

## API Testing Examples

### Complete CRUD Workflow

1. **Create a todo**:
```bash
curl -X POST http://localhost:12000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Todo", "description": "Test description"}'
```

2. **Get all todos**:
```bash
curl -X GET http://localhost:12000/api/todos
```

3. **Get specific todo**:
```bash
curl -X GET http://localhost:12000/api/todos/1
```

4. **Update todo**:
```bash
curl -X PUT http://localhost:12000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Todo", "completed": true}'
```

5. **Delete todo**:
```bash
curl -X DELETE http://localhost:12000/api/todos/1
```

## Frontend Integration

The frontend application communicates with this API using the following service:

```typescript
// Frontend API service example
const todoService = {
  async getAllTodos(): Promise<Todo[]> {
    const response = await axios.get('/api/todos');
    return response.data;
  },

  async createTodo(todo: CreateTodoDto): Promise<Todo> {
    const response = await axios.post('/api/todos', todo);
    return response.data;
  },

  async updateTodo(id: number, todo: UpdateTodoDto): Promise<Todo> {
    const response = await axios.put(`/api/todos/${id}`, todo);
    return response.data;
  },

  async deleteTodo(id: number): Promise<void> {
    await axios.delete(`/api/todos/${id}`);
  }
};
```

## Future API Enhancements

### Planned Features

1. **Pagination**: Add query parameters for pagination
   - `?page=1&limit=10`
   - `?offset=0&limit=10`

2. **Filtering**: Add query parameters for filtering
   - `?completed=true`
   - `?search=keyword`

3. **Sorting**: Add query parameters for sorting
   - `?sort=createdAt&order=desc`
   - `?sort=title&order=asc`

4. **Authentication**: JWT-based authentication
   - Authorization header: `Bearer <token>`
   - Protected endpoints

5. **Bulk Operations**: Batch operations for multiple todos
   - `POST /api/todos/bulk` - Create multiple todos
   - `PUT /api/todos/bulk` - Update multiple todos
   - `DELETE /api/todos/bulk` - Delete multiple todos

6. **Categories**: Todo categorization
   - `GET /api/categories` - Get all categories
   - `POST /api/categories` - Create category
   - `GET /api/todos?category=work` - Filter by category

### API Versioning

Future versions will be accessible via:
- `GET /api/v1/todos` (current)
- `GET /api/v2/todos` (future)

### OpenAPI/Swagger Documentation

Future implementation will include:
- Interactive API documentation
- Request/response examples
- Schema validation
- API testing interface