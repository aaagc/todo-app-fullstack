'use client'

import {
  Box,
  Checkbox,
  Text,
  IconButton,
  HStack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      p={4}
      bg={bgColor}
      borderWidth={1}
      borderColor={borderColor}
      borderRadius="md"
      shadow="sm"
    >
      <HStack spacing={3} align="start">
        <Checkbox
          isChecked={todo.completed}
          onChange={() => onToggle(todo.id)}
          colorScheme="green"
          size="lg"
          mt={1}
        />
        <VStack align="start" flex={1} spacing={1}>
          <Text
            fontSize="lg"
            fontWeight="medium"
            textDecoration={todo.completed ? 'line-through' : 'none'}
            color={todo.completed ? 'gray.500' : 'inherit'}
          >
            {todo.title}
          </Text>
          {todo.description && (
            <Text
              fontSize="sm"
              color="gray.600"
              textDecoration={todo.completed ? 'line-through' : 'none'}
            >
              {todo.description}
            </Text>
          )}
          <Text fontSize="xs" color="gray.400">
            Created: {new Date(todo.createdAt).toLocaleDateString()}
          </Text>
        </VStack>
        <HStack>
          <IconButton
            aria-label="Edit todo"
            icon={<MdEdit />}
            size="sm"
            variant="ghost"
            colorScheme="blue"
            onClick={() => onEdit(todo)}
          />
          <IconButton
            aria-label="Delete todo"
            icon={<MdDelete />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={() => onDelete(todo.id)}
          />
        </HStack>
      </HStack>
    </Box>
  );
}