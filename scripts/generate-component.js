#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function toPascalCase(str) {
  return str.replace(/(?:^|-)(.)/g, (_, char) => char.toUpperCase());
}

function generateComponent(componentName, componentType = 'basic') {
  const pascalName = toPascalCase(componentName);
  const componentDir = path.join(__dirname, '..', 'todo-frontend', 'src', 'components', componentName);

  // Create directories
  fs.mkdirSync(componentDir, { recursive: true });
  fs.mkdirSync(path.join(componentDir, '__tests__'), { recursive: true });

  let componentContent = '';
  let testContent = '';

  switch (componentType) {
    case 'form':
      componentContent = generateFormComponent(pascalName);
      testContent = generateFormTest(pascalName, componentName);
      break;
    case 'list':
      componentContent = generateListComponent(pascalName);
      testContent = generateListTest(pascalName, componentName);
      break;
    case 'modal':
      componentContent = generateModalComponent(pascalName);
      testContent = generateModalTest(pascalName, componentName);
      break;
    default:
      componentContent = generateBasicComponent(pascalName);
      testContent = generateBasicTest(pascalName, componentName);
  }

  // Write files
  fs.writeFileSync(path.join(componentDir, `${pascalName}.tsx`), componentContent);
  fs.writeFileSync(path.join(componentDir, '__tests__', `${pascalName}.test.tsx`), testContent);
  fs.writeFileSync(path.join(componentDir, 'index.ts'), `export { ${pascalName} } from './${pascalName}';`);

  console.log(`✅ Component '${componentName}' generated successfully!`);
  console.log(`📁 Files created in: todo-frontend/src/components/${componentName}/`);
}

function generateBasicComponent(pascalName) {
  return `'use client';

import { Box, Text } from '@chakra-ui/react';

interface ${pascalName}Props {
  // Add your props here
}

export function ${pascalName}(props: ${pascalName}Props) {
  return (
    <Box>
      <Text>${pascalName} Component</Text>
    </Box>
  );
}`;
}

function generateFormComponent(pascalName) {
  return `'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  useToast,
} from '@chakra-ui/react';

interface ${pascalName}Props {
  onSubmit: (data: any) => void | Promise<void>;
  onCancel?: () => void;
  initialData?: any;
  isLoading?: boolean;
}

export function ${pascalName}({ onSubmit, onCancel, initialData, isLoading }: ${pascalName}Props) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    // Add more fields as needed
  });
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Name is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(formData);
      setFormData({ name: '' }); // Reset form
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit form',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter name"
          />
        </FormControl>

        <HStack spacing={3}>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={submitting || isLoading}
            loadingText="Saving..."
          >
            Save
          </Button>
          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
              isDisabled={submitting || isLoading}
            >
              Cancel
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
}`;
}

function generateListComponent(pascalName) {
  return `'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Input,
  HStack,
  Button,
} from '@chakra-ui/react';

interface ${pascalName}Props {
  items: any[];
  onItemClick?: (item: any) => void;
  onItemDelete?: (id: number) => void;
  isLoading?: boolean;
  error?: string | null;
}

export function ${pascalName}({ items, onItemClick, onItemDelete, isLoading, error }: ${pascalName}Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    const filtered = items.filter(item =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [items, searchTerm]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={8}>
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Input
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />

      <VStack spacing={3} align="stretch">
        {filteredItems.map(item => (
          <Box
            key={item.id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            cursor={onItemClick ? "pointer" : "default"}
            onClick={() => onItemClick?.(item)}
            _hover={onItemClick ? { bg: "gray.50" } : {}}
          >
            <HStack justify="space-between">
              <Text fontWeight="medium">{item.name}</Text>
              {onItemDelete && (
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onItemDelete(item.id);
                  }}
                >
                  Delete
                </Button>
              )}
            </HStack>
          </Box>
        ))}
        
        {filteredItems.length === 0 && (
          <Text textAlign="center" color="gray.500" py={8}>
            {searchTerm ? 'No items match your search' : 'No items found'}
          </Text>
        )}
      </VStack>
    </Box>
  );
}`;
}

function generateModalComponent(pascalName) {
  return `'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';

interface ${pascalName}Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  onConfirm?: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export function ${pascalName}({
  isOpen,
  onClose,
  title = 'Modal Title',
  children,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
}: ${pascalName}Props) {
  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          {children || (
            <Text>Modal content goes here.</Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={onClose}
            isDisabled={isLoading}
          >
            {cancelText}
          </Button>
          {onConfirm && (
            <Button
              colorScheme="blue"
              onClick={handleConfirm}
              isLoading={isLoading}
              loadingText="Processing..."
            >
              {confirmText}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}`;
}

function generateBasicTest(pascalName, componentName) {
  return `import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ${pascalName} } from '../${pascalName}';

const renderWithChakra = (component: React.ReactElement) => {
  return render(<ChakraProvider>{component}</ChakraProvider>);
};

describe('${pascalName}', () => {
  it('renders correctly', () => {
    renderWithChakra(<${pascalName} />);
    expect(screen.getByText('${pascalName} Component')).toBeInTheDocument();
  });
});`;
}

function generateFormTest(pascalName, componentName) {
  return `import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ${pascalName} } from '../${pascalName}';

const renderWithChakra = (component: React.ReactElement) => {
  return render(<ChakraProvider>{component}</ChakraProvider>);
};

describe('${pascalName}', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields', () => {
    renderWithChakra(
      <${pascalName} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('calls onSubmit with form data', async () => {
    renderWithChakra(
      <${pascalName} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );
    
    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole('button', { name: /save/i });

    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({ name: 'Test Name' });
    });
  });

  it('calls onCancel when cancel button is clicked', () => {
    renderWithChakra(
      <${pascalName} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('shows validation error for empty name', async () => {
    renderWithChakra(
      <${pascalName} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />
    );
    
    const submitButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(submitButton);

    // Toast should appear with validation error
    // Note: You might need to mock useToast for this test
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});`;
}

function generateListTest(pascalName, componentName) {
  return `import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ${pascalName} } from '../${pascalName}';

const renderWithChakra = (component: React.ReactElement) => {
  return render(<ChakraProvider>{component}</ChakraProvider>);
};

const mockItems = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Another Item' },
];

describe('${pascalName}', () => {
  const mockOnItemClick = jest.fn();
  const mockOnItemDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders list of items', () => {
    renderWithChakra(
      <${pascalName} items={mockItems} />
    );
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Another Item')).toBeInTheDocument();
  });

  it('filters items based on search term', () => {
    renderWithChakra(
      <${pascalName} items={mockItems} />
    );
    
    const searchInput = screen.getByPlaceholderText(/search items/i);
    fireEvent.change(searchInput, { target: { value: 'Another' } });

    expect(screen.getByText('Another Item')).toBeInTheDocument();
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
  });

  it('calls onItemClick when item is clicked', () => {
    renderWithChakra(
      <${pascalName} items={mockItems} onItemClick={mockOnItemClick} />
    );
    
    fireEvent.click(screen.getByText('Item 1'));
    expect(mockOnItemClick).toHaveBeenCalledWith(mockItems[0]);
  });

  it('calls onItemDelete when delete button is clicked', () => {
    renderWithChakra(
      <${pascalName} items={mockItems} onItemDelete={mockOnItemDelete} />
    );
    
    const deleteButtons = screen.getAllByText(/delete/i);
    fireEvent.click(deleteButtons[0]);
    
    expect(mockOnItemDelete).toHaveBeenCalledWith(1);
  });

  it('shows loading state', () => {
    renderWithChakra(
      <${pascalName} items={[]} isLoading={true} />
    );
    
    expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner
  });

  it('shows error state', () => {
    renderWithChakra(
      <${pascalName} items={[]} error="Something went wrong" />
    );
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows empty state message', () => {
    renderWithChakra(
      <${pascalName} items={[]} />
    );
    
    expect(screen.getByText(/no items found/i)).toBeInTheDocument();
  });
});`;
}

function generateModalTest(pascalName, componentName) {
  return `import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ${pascalName} } from '../${pascalName}';

const renderWithChakra = (component: React.ReactElement) => {
  return render(<ChakraProvider>{component}</ChakraProvider>);
};

describe('${pascalName}', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when open', () => {
    renderWithChakra(
      <${pascalName} isOpen={true} onClose={mockOnClose} title="Test Modal" />
    );
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content goes here.')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderWithChakra(
      <${pascalName} isOpen={false} onClose={mockOnClose} title="Test Modal" />
    );
    
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    renderWithChakra(
      <${pascalName} isOpen={true} onClose={mockOnClose} />
    );
    
    const closeButton = screen.getByLabelText(/close/i);
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when cancel button is clicked', () => {
    renderWithChakra(
      <${pascalName} isOpen={true} onClose={mockOnClose} />
    );
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onConfirm and onClose when confirm button is clicked', async () => {
    renderWithChakra(
      <${pascalName} 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm}
      />
    );
    
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmButton);
    
    await waitFor(() => {
      expect(mockOnConfirm).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('renders custom content', () => {
    renderWithChakra(
      <${pascalName} isOpen={true} onClose={mockOnClose}>
        <div>Custom content</div>
      </${pascalName}>
    );
    
    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });

  it('shows loading state on confirm button', () => {
    renderWithChakra(
      <${pascalName} 
        isOpen={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm}
        isLoading={true}
      />
    );
    
    const confirmButton = screen.getByRole('button', { name: /processing/i });
    expect(confirmButton).toBeDisabled();
  });
});`;
}

// Main execution
const componentName = process.argv[2];
const componentType = process.argv[3] || 'basic';

if (!componentName) {
  console.error('❌ Please provide a component name');
  console.log('Usage: npm run generate:component <component-name> [type]');
  console.log('Types: basic, form, list, modal');
  console.log('Example: npm run generate:component user-card form');
  process.exit(1);
}

const validTypes = ['basic', 'form', 'list', 'modal'];
if (!validTypes.includes(componentType)) {
  console.error(`❌ Invalid component type: ${componentType}`);
  console.log(`Valid types: ${validTypes.join(', ')}`);
  process.exit(1);
}

console.log(`🚀 Generating ${componentType} component: ${componentName}`);

generateComponent(componentName, componentType);

console.log(`\n🎉 Component '${componentName}' generated successfully!`);
console.log(`\n📋 Files created:`);
console.log(`   - Component: src/components/${componentName}/${toPascalCase(componentName)}.tsx`);
console.log(`   - Test: src/components/${componentName}/__tests__/${toPascalCase(componentName)}.test.tsx`);
console.log(`   - Index: src/components/${componentName}/index.ts`);