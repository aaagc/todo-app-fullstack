# Todo App

A full-stack Todo application built with NestJS (backend) and Next.js (frontend).

## Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as completed/incomplete
- ✅ Search todos by title or description
- ✅ Filter todos by status (all, active, completed)
- ✅ Real-time todo statistics
- ✅ Responsive design with Chakra UI
- ✅ SQLite database with TypeORM

## Tech Stack

### Backend (NestJS)
- **Framework**: NestJS
- **Database**: SQLite with TypeORM
- **Validation**: class-validator, class-transformer
- **API**: RESTful API with CORS enabled

### Frontend (Next.js)
- **Framework**: Next.js 15 with App Router
- **UI Library**: Chakra UI
- **HTTP Client**: Axios
- **Language**: TypeScript

## Project Structure

```
/workspace/
├── todo-backend/          # NestJS backend application
│   ├── src/              # Source code
│   │   ├── todos/        # Todo module
│   │   ├── app.module.ts # Root module
│   │   └── main.ts       # Entry point
│   ├── todos.db          # SQLite database file
│   └── README.md         # Backend development guide (501 lines)
├── todo-frontend/        # Next.js frontend application
│   ├── src/              # Source code
│   │   ├── app/          # App Router pages
│   │   ├── components/   # React components
│   │   ├── services/     # API services
│   │   └── types/        # TypeScript types
│   └── README.md         # Frontend development guide (695 lines)
├── docs/                 # Comprehensive documentation
│   ├── OVERVIEW.md       # Project overview and highlights (271 lines)
│   ├── SYSTEM_DESIGN.md  # System architecture and design (246 lines)
│   ├── API_SPECIFICATION.md # REST API documentation (482 lines)
│   └── README.md         # Documentation index (89 lines)
├── docs-summary.sh       # Documentation summary script
└── README.md            # Main project documentation (185 lines)
```

## API Endpoints

### Todos
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PATCH /api/todos/:id` - Update a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status
- `DELETE /api/todos/:id` - Delete a todo

### Request/Response Examples

#### Create Todo
```bash
POST /api/todos
Content-Type: application/json

{
  "title": "Learn NestJS",
  "description": "Complete the NestJS tutorial",
  "completed": false
}
```

#### Response
```json
{
  "id": 1,
  "title": "Learn NestJS",
  "description": "Complete the NestJS tutorial",
  "completed": false,
  "createdAt": "2025-06-11T00:09:57.000Z",
  "updatedAt": "2025-06-11T00:09:57.000Z"
}
```

## Running the Application

### Backend (Port 12000)
```bash
cd todo-backend
npm install
npm run start:dev
```

### Frontend (Port 12001)
```bash
cd todo-frontend
npm install
npm run dev
```

## Access URLs

- **Frontend**: https://work-2-crmexbyyrgxcmdqj.prod-runtime.all-hands.dev
- **Backend API**: https://work-1-crmexbyyrgxcmdqj.prod-runtime.all-hands.dev/api

## Development Notes

- The backend uses SQLite for simplicity and development ease
- CORS is enabled to allow frontend-backend communication
- The frontend uses Chakra UI for a modern, accessible interface
- Both applications are configured to run on specific ports and hosts for the development environment
- TypeScript is used throughout for type safety

## Documentation Structure

This project includes comprehensive documentation for different audiences and purposes:

### 📚 Main Documentation Hub (`/docs/`)
- **[📋 Documentation Index](./docs/README.md)** - Navigation guide to all documentation
- **[🎯 Project Overview](./docs/OVERVIEW.md)** - Complete project summary, features, and highlights (271 lines)
- **[📋 System Design](./docs/SYSTEM_DESIGN.md)** - Architecture overview, technology stack, and scalability (246 lines)
- **[🔌 API Specification](./docs/API_SPECIFICATION.md)** - Detailed REST API documentation with examples (482 lines)

### 👥 Team-Specific Documentation
- **[⚙️ Backend README](./todo-backend/README.md)** - NestJS backend development guide (501 lines)
- **[🎨 Frontend README](./todo-frontend/README.md)** - Next.js frontend development guide (695 lines)

### 📊 Documentation Summary Command
```bash
# Quick documentation overview (one-liner)
bash docs-summary.sh

# Or use the full command:
echo "=== DOCUMENTATION SUMMARY ===" && echo "" && \
echo "📁 Main Project Documentation:" && ls -la /workspace/README.md && echo "" && \
echo "📁 Comprehensive Documentation (/workspace/docs/):" && ls -la /workspace/docs/ && echo "" && \
echo "📁 Backend Team Documentation:" && ls -la /workspace/todo-backend/README.md && echo "" && \
echo "📁 Frontend Team Documentation:" && ls -la /workspace/todo-frontend/README.md && echo "" && \
echo "=== LINE COUNTS ===" && \
echo "Main README: $(wc -l < /workspace/README.md) lines" && \
echo "System Design: $(wc -l < /workspace/docs/SYSTEM_DESIGN.md) lines" && \
echo "API Specification: $(wc -l < /workspace/docs/API_SPECIFICATION.md) lines" && \
echo "Project Overview: $(wc -l < /workspace/docs/OVERVIEW.md) lines" && \
echo "Backend README: $(wc -l < /workspace/todo-backend/README.md) lines" && \
echo "Frontend README: $(wc -l < /workspace/todo-frontend/README.md) lines"
```

### 🎯 Quick Navigation by Role

#### 🔧 **For Developers Getting Started**
1. Start with [Project Overview](./docs/OVERVIEW.md) for features and tech stack
2. Review [System Design](./docs/SYSTEM_DESIGN.md) for architecture understanding
3. Choose your focus:
   - **Backend Development**: [Backend README](./todo-backend/README.md)
   - **Frontend Development**: [Frontend README](./todo-frontend/README.md)

#### 🏗️ **For System Architects**
1. [System Design](./docs/SYSTEM_DESIGN.md) - Complete architecture analysis
2. [API Specification](./docs/API_SPECIFICATION.md) - Interface contracts
3. [Project Overview](./docs/OVERVIEW.md) - Scalability and performance considerations

#### 🔌 **For API Consumers**
1. [API Specification](./docs/API_SPECIFICATION.md) - Complete endpoint documentation
2. [Backend README](./todo-backend/README.md) - Setup and testing guide

#### 🎨 **For UI/UX Developers**
1. [Frontend README](./todo-frontend/README.md) - Component library and styling guide
2. [Project Overview](./docs/OVERVIEW.md) - User experience features

### 📈 Documentation Metrics
- **Total Documentation**: ~2,379 lines across 6 files
- **Coverage**: Complete system documentation from architecture to implementation
- **Maintenance**: All documentation is version-controlled and updated with code changes
- **Last Updated**: 2025-06-11

## Future Enhancements

- User authentication and authorization
- Todo categories/tags
- Due dates and reminders
- File attachments
- Collaborative todos
- Dark/light theme toggle
- Drag and drop reordering
- Export/import functionality