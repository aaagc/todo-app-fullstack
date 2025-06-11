# Todo Frontend - Next.js React Application

A modern, responsive frontend application built with Next.js 14, TypeScript, and Chakra UI for the Todo management system. Features a clean, intuitive interface with real-time updates, advanced filtering, and comprehensive accessibility support.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Application will be available at http://localhost:12001
```

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Development](#-development)
- [Components](#-components)
- [State Management](#-state-management)
- [Styling & UI](#-styling--ui)
- [API Integration](#-api-integration)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### Core Functionality
- ✅ **Todo Management** - Create, read, update, delete todos with rich interface
- ✅ **Real-time Search** - Instant text-based filtering with partial matches
- ✅ **Smart Filtering** - Filter by status (All/Active/Completed) with keyboard navigation
- ✅ **Live Statistics** - Real-time counters for total, active, and completed todos
- ✅ **Modal Editing** - Intuitive edit interface with pre-populated fields

### User Experience
- ✅ **Responsive Design** - Mobile-first approach with seamless desktop experience
- ✅ **Accessibility** - WCAG-compliant with keyboard navigation and screen reader support
- ✅ **Visual Feedback** - Strikethrough for completed todos, loading states, success notifications
- ✅ **Keyboard Navigation** - Full keyboard support for all interactions
- ✅ **Toast Notifications** - Success/error feedback for all operations

### Performance & Quality
- ✅ **TypeScript** - Full type safety across all components and services
- ✅ **Code Splitting** - Automatic Next.js optimizations for fast loading
- ✅ **Error Handling** - Comprehensive error boundaries and user-friendly messages
- ✅ **SEO Optimized** - Next.js built-in SEO optimizations

## 🛠 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework | ^14.2.0 |
| **React** | UI library | ^18.3.0 |
| **TypeScript** | Type safety | ^5.0.0 |
| **Chakra UI** | Component library | ^2.10.9 |
| **Emotion** | CSS-in-JS | ^11.11.0 |
| **Axios** | HTTP client | ^1.7.0 |
| **React Icons** | Icon library | ^5.3.0 |
| **Framer Motion** | Animations | ^11.11.0 |

## 📁 Project Structure

```
todo-frontend/
├── 📂 src/
│   ├── 📂 app/                      # Next.js App Router
│   │   ├── 📄 layout.tsx            # Root layout with providers
│   │   ├── 📄 page.tsx              # Home page component
│   │   └── 📄 globals.css           # Global styles
│   ├── 📂 components/               # React components
│   │   ├── 📄 TodoList.tsx          # Main todo container with filtering
│   │   ├── 📄 TodoItem.tsx          # Individual todo item display
│   │   └── 📄 TodoForm.tsx          # Create/edit modal form
│   ├── 📂 services/                 # API and external services
│   │   └── 📄 todoService.ts        # Backend API communication
│   ├── 📂 types/                    # TypeScript type definitions
│   │   └── 📄 todo.ts               # Todo-related interfaces
│   └── 📂 hooks/                    # Custom React hooks (future)
├── 📂 public/                       # Static assets
├── 📄 package.json                  # Dependencies and scripts
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 next.config.ts                # Next.js configuration
└── 📄 tailwind.config.js            # Tailwind CSS configuration
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Backend API running on port 12000

### Installation Steps

1. **Navigate to frontend directory**
   ```bash
   cd todo-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup** (optional)
   ```bash
   # Create .env.local for custom configuration
   echo "NEXT_PUBLIC_API_URL=http://localhost:12000/api" > .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🚀 Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Type checking
npm run type-check

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Development Server

```bash
npm run dev
```

The application will start on `http://localhost:12001` with:
- 🔄 **Hot Module Replacement** - Instant updates on code changes
- 🎯 **Fast Refresh** - Preserves component state during updates
- 🔍 **TypeScript checking** - Real-time type error detection
- 📱 **Responsive preview** - Test on different screen sizes

### Environment Configuration

Create `.env.local` for environment-specific settings:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:12000/api

# Development settings
NEXT_PUBLIC_ENV=development
```

## 🧩 Components

### TodoList Component
**Location**: `src/components/TodoList.tsx`

Main container component that manages the todo list state and provides filtering capabilities.

```typescript
interface TodoListProps {
  // No props - self-contained component
}

Features:
- Real-time todo fetching from API
- Search functionality with instant filtering
- Status filtering (All/Active/Completed)
- Statistics calculation and display
- Error handling and loading states
```

### TodoItem Component
**Location**: `src/components/TodoItem.tsx`

Individual todo item display with interactive controls.

```typescript
interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, updates: Partial<Todo>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

Features:
- Checkbox for completion toggle
- Edit button with modal integration
- Delete button with confirmation
- Visual styling for completed items
- Accessibility attributes
```

### TodoForm Component
**Location**: `src/components/TodoForm.tsx`

Modal form for creating and editing todos.

```typescript
interface TodoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (todo: CreateTodoDto) => Promise<void>;
  editTodo?: Todo; // Optional for edit mode
}

Features:
- Create and edit modes
- Form validation with Chakra UI
- Pre-population for edit mode
- Keyboard navigation support
- Error handling and success feedback
```

## 🎨 Styling & UI

### Chakra UI Integration

The application uses Chakra UI v2.10.9 for consistent, accessible components:

```typescript
// Theme configuration in layout.tsx
import { ChakraProvider } from '@chakra-ui/react'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
```

### Component Styling Examples

```typescript
// Responsive design with Chakra UI
<Box
  maxW="4xl"
  mx="auto"
  p={{ base: 4, md: 8 }}
  bg="white"
  borderRadius="lg"
  boxShadow="lg"
>
  {/* Content */}
</Box>

// Accessible form controls
<FormControl isRequired>
  <FormLabel>Todo Title</FormLabel>
  <Input
    placeholder="Enter todo title..."
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
</FormControl>
```

### Responsive Design

The application follows mobile-first responsive design principles:

```typescript
// Responsive breakpoints
const breakpoints = {
  base: '0px',    // Mobile
  sm: '480px',    // Small mobile
  md: '768px',    // Tablet
  lg: '992px',    // Desktop
  xl: '1280px',   // Large desktop
}

// Usage in components
<Stack
  direction={{ base: 'column', md: 'row' }}
  spacing={{ base: 4, md: 8 }}
>
```

## 🔄 State Management

### Local State with React Hooks

The application uses React hooks for state management:

```typescript
// TodoList component state
const [todos, setTodos] = useState<Todo[]>([]);
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState('');
const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

// Computed values
const filteredTodos = useMemo(() => {
  return todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && !todo.completed) ||
                         (filter === 'completed' && todo.completed);
    return matchesSearch && matchesFilter;
  });
}, [todos, searchTerm, filter]);
```

### Custom Hooks (Future Enhancement)

```typescript
// Example custom hook for todo management
const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  return { todos, loading, fetchTodos };
};
```

## 🌐 API Integration

### Todo Service
**Location**: `src/services/todoService.ts`

Centralized API communication layer using Axios:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:12000/api';

const todoService = {
  async getAllTodos(): Promise<Todo[]> {
    const response = await axios.get(`${API_BASE_URL}/todos`);
    return response.data;
  },

  async createTodo(todo: CreateTodoDto): Promise<Todo> {
    const response = await axios.post(`${API_BASE_URL}/todos`, todo);
    return response.data;
  },

  async updateTodo(id: number, updates: UpdateTodoDto): Promise<Todo> {
    const response = await axios.put(`${API_BASE_URL}/todos/${id}`, updates);
    return response.data;
  },

  async deleteTodo(id: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/todos/${id}`);
  }
};
```

### Error Handling

```typescript
// API error handling with user feedback
const handleApiError = (error: any, toast: any) => {
  const message = error.response?.data?.message || 'An error occurred';
  toast({
    title: 'Error',
    description: message,
    status: 'error',
    duration: 5000,
    isClosable: true,
  });
};

// Usage in components
try {
  await todoService.createTodo(newTodo);
  toast({
    title: 'Success',
    description: 'Todo created successfully',
    status: 'success',
    duration: 3000,
    isClosable: true,
  });
} catch (error) {
  handleApiError(error, toast);
}
```

## 🧪 Testing

### Test Structure (Future Implementation)

```
__tests__/
├── 📂 components/
│   ├── 📄 TodoList.test.tsx
│   ├── 📄 TodoItem.test.tsx
│   └── 📄 TodoForm.test.tsx
├── 📂 services/
│   └── 📄 todoService.test.ts
└── 📂 utils/
    └── 📄 testUtils.tsx
```

### Testing Setup

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Example Test

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import TodoItem from '../components/TodoItem';

const renderWithChakra = (component: React.ReactElement) => {
  return render(
    <ChakraProvider>
      {component}
    </ChakraProvider>
  );
};

describe('TodoItem', () => {
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it('renders todo item correctly', () => {
    renderWithChakra(
      <TodoItem 
        todo={mockTodo} 
        onUpdate={jest.fn()} 
        onDelete={jest.fn()} 
      />
    );
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
```

## 🚀 Deployment

### Production Build

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

### Environment Variables

```env
# Production environment
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_ENV=production
```

### Deployment Platforms

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
```

#### Netlify
```bash
# Build command: npm run build
# Publish directory: out
# Environment variables: Set in Netlify dashboard
```

#### Docker Deployment
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

## 🤝 Contributing

### Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/new-component
   ```

2. **Make changes and test**
   ```bash
   npm run type-check
   npm run lint
   npm run test
   ```

3. **Commit changes**
   ```bash
   git commit -m "feat: add new todo filtering component"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/new-component
   ```

### Code Standards

- **TypeScript**: Use strict type checking for all components
- **ESLint**: Follow configured linting rules
- **Prettier**: Use for consistent code formatting
- **Component Structure**: Follow established patterns

### Adding New Components

1. **Create component file**
   ```typescript
   // src/components/NewComponent.tsx
   import { FC } from 'react';
   import { Box } from '@chakra-ui/react';

   interface NewComponentProps {
     // Define props interface
   }

   const NewComponent: FC<NewComponentProps> = ({ ...props }) => {
     return (
       <Box>
         {/* Component content */}
       </Box>
     );
   };

   export default NewComponent;
   ```

2. **Add TypeScript types**
   ```typescript
   // src/types/newFeature.ts
   export interface NewFeature {
     id: number;
     name: string;
   }
   ```

3. **Update exports**
   ```typescript
   // src/components/index.ts
   export { default as NewComponent } from './NewComponent';
   ```

## 🔧 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
npm run type-check

# Update TypeScript
npm update typescript @types/react @types/node
```

#### Chakra UI Issues
```bash
# Ensure proper provider setup in layout.tsx
# Check Chakra UI version compatibility
npm list @chakra-ui/react
```

### Debug Mode

```bash
# Start with debug logging
DEBUG=* npm run dev

# Enable Next.js debug mode
NEXT_DEBUG=1 npm run dev
```

## 📞 Support

- **Documentation**: [System Design](../docs/SYSTEM_DESIGN.md)
- **Component Library**: [Chakra UI Documentation](https://chakra-ui.com/)
- **Framework**: [Next.js Documentation](https://nextjs.org/docs)
- **Issues**: Create GitHub issues for bugs or feature requests

## 🎯 Next Steps

### Immediate Improvements
- [ ] Add comprehensive unit and integration tests
- [ ] Implement error boundaries for better error handling
- [ ] Add loading skeletons for better UX
- [ ] Implement offline support with service workers

### Future Enhancements
- [ ] Dark/light theme toggle
- [ ] Drag and drop todo reordering
- [ ] Todo categories and tags
- [ ] Due dates with calendar integration
- [ ] Collaborative features with real-time updates
- [ ] Progressive Web App (PWA) features
- [ ] Advanced animations with Framer Motion
- [ ] Internationalization (i18n) support

### Performance Optimizations
- [ ] Implement virtual scrolling for large todo lists
- [ ] Add image optimization for attachments
- [ ] Implement caching strategies
- [ ] Bundle size optimization

---

**Happy coding! 🎨**

For questions or contributions, please refer to the main project documentation or create an issue.