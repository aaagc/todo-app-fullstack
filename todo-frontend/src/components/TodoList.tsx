'use client'

import {
  Box,
  VStack,
  HStack,
  Heading,
  Button,
  Text,
  useDisclosure,
  useToast,
  Spinner,
  Center,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoDto, UpdateTodoDto } from '@/types/todo';
import { todoApi } from '@/services/api';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await todoApi.getTodos();
      setTodos(data);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to fetch todos',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const filterTodos = useCallback(() => {
    let filtered = todos;

    // Filter by completion status
    if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (todo.description && todo.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredTodos(filtered);
  }, [todos, filter, searchTerm]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    filterTodos();
  }, [todos, filter, searchTerm, filterTodos]);

  const handleAddTodo = async (todoData: CreateTodoDto) => {
    try {
      setSubmitting(true);
      const newTodo = await todoApi.createTodo(todoData);
      setTodos(prev => [newTodo, ...prev]);
      toast({
        title: 'Success',
        description: 'Todo added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to add todo',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateTodo = async (todoData: UpdateTodoDto) => {
    if (!editingTodo) return;

    try {
      setSubmitting(true);
      const updatedTodo = await todoApi.updateTodo(editingTodo.id, todoData);
      setTodos(prev => prev.map(todo => 
        todo.id === editingTodo.id ? updatedTodo : todo
      ));
      toast({
        title: 'Success',
        description: 'Todo updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update todo',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
      setEditingTodo(null);
    }
  };

  const handleFormSubmit = async (todoData: CreateTodoDto | UpdateTodoDto) => {
    if (editingTodo) {
      await handleUpdateTodo(todoData as UpdateTodoDto);
    } else {
      await handleAddTodo(todoData as CreateTodoDto);
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      const updatedTodo = await todoApi.toggleTodo(id);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to toggle todo',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      toast({
        title: 'Success',
        description: 'Todo deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to delete todo',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    onOpen();
  };

  const handleFormClose = () => {
    setEditingTodo(null);
    onClose();
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;

  if (loading) {
    return (
      <Center h="200px">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box maxW="800px" mx="auto" p={6}>
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between" align="center">
          <Heading size="lg" color="blue.600">
            Todo App
          </Heading>
          <Button
            leftIcon={<MdAdd />}
            colorScheme="blue"
            onClick={onOpen}
          >
            Add Todo
          </Button>
        </HStack>

        <HStack spacing={4}>
          <InputGroup flex={1}>
            <InputLeftElement pointerEvents="none">
              <MdSearch color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search todos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'completed')}
            w="150px"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </Select>
        </HStack>

        <HStack spacing={4} fontSize="sm" color="gray.600">
          <Text>Total: {todos.length}</Text>
          <Text>Active: {activeCount}</Text>
          <Text>Completed: {completedCount}</Text>
        </HStack>

        {filteredTodos.length === 0 ? (
          <Center py={10}>
            <Text color="gray.500" fontSize="lg">
              {todos.length === 0 
                ? "No todos yet. Add your first todo!" 
                : "No todos match your current filter."}
            </Text>
          </Center>
        ) : (
          <VStack spacing={3} align="stretch">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
              />
            ))}
          </VStack>
        )}
      </VStack>

      <TodoForm
        isOpen={isOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        todo={editingTodo}
        isLoading={submitting}
      />
    </Box>
  );
}