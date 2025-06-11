import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { TodoItem } from '../TodoItem';
import { Todo } from '@/types/todo';

const renderWithChakra = (component: React.ReactElement) => {
  return render(<ChakraProvider>{component}</ChakraProvider>);
};

const mockTodo: Todo = {
  id: 1,
  title: 'Test Todo',
  description: 'Test Description',
  completed: false,
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
};

describe('TodoItem', () => {
  const mockOnDelete = jest.fn();
  const mockOnToggle = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders todo item correctly', () => {
    renderWithChakra(
      <TodoItem
        todo={mockTodo}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onEdit={mockOnEdit}
      />
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('shows completed state correctly', () => {
    const completedTodo = { ...mockTodo, completed: true };
    
    renderWithChakra(
      <TodoItem
        todo={completedTodo}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onEdit={mockOnEdit}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onToggle when checkbox is clicked', async () => {
    renderWithChakra(
      <TodoItem
        todo={mockTodo}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onEdit={mockOnEdit}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  it('calls onDelete when delete button is clicked', () => {
    renderWithChakra(
      <TodoItem
        todo={mockTodo}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onEdit={mockOnEdit}
      />
    );

    const deleteButton = screen.getByLabelText('Delete todo');
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('calls onEdit when edit button is clicked', () => {
    renderWithChakra(
      <TodoItem
        todo={mockTodo}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onEdit={mockOnEdit}
      />
    );

    const editButton = screen.getByLabelText('Edit todo');
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockTodo);
  });
});