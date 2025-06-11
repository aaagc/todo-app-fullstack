'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Checkbox,
  VStack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Todo, CreateTodoDto, UpdateTodoDto } from '@/types/todo';

interface TodoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (todo: CreateTodoDto | UpdateTodoDto) => void | Promise<void>;
  todo?: Todo | null;
  isLoading?: boolean;
}

export function TodoForm({ isOpen, onClose, onSubmit, todo, isLoading }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
      setCompleted(todo.completed);
    } else {
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
  }, [todo, isOpen]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    const todoData = {
      title: title.trim(),
      description: description.trim() || undefined,
      completed,
    };

    onSubmit(todoData);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setCompleted(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{todo ? 'Edit Todo' : 'Add New Todo'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter todo title"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter todo description (optional)"
                rows={3}
              />
            </FormControl>
            <FormControl>
              <Checkbox
                isChecked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              >
                Mark as completed
              </Checkbox>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isLoading}
            isDisabled={!title.trim()}
          >
            {todo ? 'Update' : 'Add'} Todo
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}