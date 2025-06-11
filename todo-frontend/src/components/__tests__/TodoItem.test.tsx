import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { TodoItem } from '../TodoItem';
import { Todo } from '@/types/todo';

const mockTodo: Todo = {
  id: 1,
  title: 'Test Todo',
  description: 'Test Description',
  completed: false,
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
};

const renderWithChakra = (component: React.ReactElement) => {
  return render(<ChakraProvider>{component}</ChakraProvider>);
};

describe('TodoItem', () => {
  const mockOnUpdate = jest.fn();
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
        onUpdate={mockOnUpdate}
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
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onToggle when checkbox is clicked', async () => {
    renderWithChakra(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onEdit={mockOnEdit}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(mockOnToggle).toHaveBeenCalledWith(mockTodo.id);
    });
  });

  it('calls onDelete when delete button is clicked', async () => {
    renderWithChakra(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onEdit={mockOnEdit}
      />
    );

    const deleteButton = screen.getByLabelText(/delete/i);
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith(mockTodo.id);
    });
  });

  it('calls onEdit when edit button is clicked', async () => {
    renderWithChakra(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
        onToggle={mockOnToggle}
        onEdit={mockOnEdit}
      />
    );

    const editButton = screen.getByLabelText(/edit/i);
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(mockOnEdit).toHaveBeenCalledWith(mockTodo);
    });
  });


});