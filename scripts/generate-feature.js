#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function toPascalCase(str) {
  return str.replace(/(?:^|-)(.)/g, (_, char) => char.toUpperCase());
}

function toCamelCase(str) {
  return str.replace(/-(.)/g, (_, char) => char.toUpperCase());
}

function generateBackendFeature(featureName) {
  const pascalName = toPascalCase(featureName);
  const camelName = toCamelCase(featureName);
  const featureDir = path.join(__dirname, '..', 'todo-backend', 'src', featureName);

  // Create directories
  fs.mkdirSync(featureDir, { recursive: true });
  fs.mkdirSync(path.join(featureDir, 'dto'), { recursive: true });

  // Entity
  const entityContent = `import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ${pascalName} {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}`;

  // Service
  const serviceContent = `import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${pascalName} } from './${featureName}.entity';
import { Create${pascalName}Dto } from './dto/create-${featureName}.dto';
import { Update${pascalName}Dto } from './dto/update-${featureName}.dto';

@Injectable()
export class ${pascalName}Service {
  constructor(
    @InjectRepository(${pascalName})
    private ${camelName}Repository: Repository<${pascalName}>,
  ) {}

  async create(create${pascalName}Dto: Create${pascalName}Dto): Promise<${pascalName}> {
    const ${camelName} = this.${camelName}Repository.create(create${pascalName}Dto);
    return this.${camelName}Repository.save(${camelName});
  }

  async findAll(): Promise<${pascalName}[]> {
    return this.${camelName}Repository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<${pascalName}> {
    const ${camelName} = await this.${camelName}Repository.findOne({ where: { id } });
    if (!${camelName}) {
      throw new NotFoundException(\`${pascalName} with ID \${id} not found\`);
    }
    return ${camelName};
  }

  async update(id: number, update${pascalName}Dto: Update${pascalName}Dto): Promise<${pascalName}> {
    const ${camelName} = await this.findOne(id);
    Object.assign(${camelName}, update${pascalName}Dto);
    return this.${camelName}Repository.save(${camelName});
  }

  async remove(id: number): Promise<void> {
    const ${camelName} = await this.findOne(id);
    await this.${camelName}Repository.remove(${camelName});
  }
}`;

  // Controller
  const controllerContent = `import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ${pascalName}Service } from './${featureName}.service';
import { Create${pascalName}Dto } from './dto/create-${featureName}.dto';
import { Update${pascalName}Dto } from './dto/update-${featureName}.dto';

@Controller('${featureName}s')
export class ${pascalName}Controller {
  constructor(private readonly ${camelName}Service: ${pascalName}Service) {}

  @Post()
  create(@Body() create${pascalName}Dto: Create${pascalName}Dto) {
    return this.${camelName}Service.create(create${pascalName}Dto);
  }

  @Get()
  findAll() {
    return this.${camelName}Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.${camelName}Service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() update${pascalName}Dto: Update${pascalName}Dto,
  ) {
    return this.${camelName}Service.update(id, update${pascalName}Dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.${camelName}Service.remove(id);
  }
}`;

  // Module
  const moduleContent = `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${pascalName}Service } from './${featureName}.service';
import { ${pascalName}Controller } from './${featureName}.controller';
import { ${pascalName} } from './${featureName}.entity';

@Module({
  imports: [TypeOrmModule.forFeature([${pascalName}])],
  controllers: [${pascalName}Controller],
  providers: [${pascalName}Service],
  exports: [${pascalName}Service],
})
export class ${pascalName}Module {}`;

  // DTOs
  const createDtoContent = `import { IsString, IsOptional } from 'class-validator';

export class Create${pascalName}Dto {
  @IsString()
  name: string;
}`;

  const updateDtoContent = `import { PartialType } from '@nestjs/mapped-types';
import { Create${pascalName}Dto } from './create-${featureName}.dto';

export class Update${pascalName}Dto extends PartialType(Create${pascalName}Dto) {}`;

  // Write files
  fs.writeFileSync(path.join(featureDir, `${featureName}.entity.ts`), entityContent);
  fs.writeFileSync(path.join(featureDir, `${featureName}.service.ts`), serviceContent);
  fs.writeFileSync(path.join(featureDir, `${featureName}.controller.ts`), controllerContent);
  fs.writeFileSync(path.join(featureDir, `${featureName}.module.ts`), moduleContent);
  fs.writeFileSync(path.join(featureDir, 'dto', `create-${featureName}.dto.ts`), createDtoContent);
  fs.writeFileSync(path.join(featureDir, 'dto', `update-${featureName}.dto.ts`), updateDtoContent);

  console.log(`✅ Backend feature '${featureName}' generated successfully!`);
  console.log(`📁 Files created in: todo-backend/src/${featureName}/`);
  console.log(`📝 Don't forget to:`);
  console.log(`   1. Add ${pascalName}Module to app.module.ts`);
  console.log(`   2. Add ${pascalName} entity to TypeORM configuration`);
}

function generateFrontendFeature(featureName) {
  const pascalName = toPascalCase(featureName);
  const camelName = toCamelCase(featureName);
  const featureDir = path.join(__dirname, '..', 'todo-frontend', 'src', 'components', featureName);

  // Create directories
  fs.mkdirSync(featureDir, { recursive: true });
  fs.mkdirSync(path.join(featureDir, '__tests__'), { recursive: true });

  // Component
  const componentContent = `'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { ${pascalName}Item } from './${pascalName}Item';
import { ${pascalName}Form } from './${pascalName}Form';
import { ${camelName}Api } from '@/services/${featureName}Api';
import { ${pascalName} } from '@todo-app/shared';

export function ${pascalName}List() {
  const [${camelName}s, set${pascalName}s] = useState<${pascalName}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const toast = useToast();

  useEffect(() => {
    load${pascalName}s();
  }, []);

  const load${pascalName}s = async () => {
    try {
      setLoading(true);
      const data = await ${camelName}Api.get${pascalName}s();
      set${pascalName}s(data);
      setError(null);
    } catch (err) {
      setError('Failed to load ${featureName}s');
      console.error('Error loading ${featureName}s:', err);
    } finally {
      setLoading(false);
    }
  };

  const handle${pascalName}Created = async (${camelName}: ${pascalName}) => {
    set${pascalName}s(prev => [${camelName}, ...prev]);
    setShowForm(false);
    toast({
      title: '${pascalName} created',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handle${pascalName}Updated = async (id: number, updated${pascalName}: ${pascalName}) => {
    set${pascalName}s(prev => prev.map(item => item.id === id ? updated${pascalName} : item));
    toast({
      title: '${pascalName} updated',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handle${pascalName}Deleted = async (id: number) => {
    set${pascalName}s(prev => prev.filter(item => item.id !== id));
    toast({
      title: '${pascalName} deleted',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  if (loading) {
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
      <HStack justify="space-between" mb={6}>
        <Text fontSize="2xl" fontWeight="bold">
          ${pascalName}s
        </Text>
        <Button
          colorScheme="blue"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add ${pascalName}'}
        </Button>
      </HStack>

      {showForm && (
        <Box mb={6}>
          <${pascalName}Form
            onSubmit={handle${pascalName}Created}
            onCancel={() => setShowForm(false)}
          />
        </Box>
      )}

      <VStack spacing={4} align="stretch">
        {${camelName}s.map(${camelName} => (
          <${pascalName}Item
            key={${camelName}.id}
            ${camelName}={${camelName}}
            onUpdate={handle${pascalName}Updated}
            onDelete={handle${pascalName}Deleted}
          />
        ))}
        {${camelName}s.length === 0 && (
          <Text textAlign="center" color="gray.500" py={8}>
            No ${featureName}s found. Create your first one!
          </Text>
        )}
      </VStack>
    </Box>
  );
}`;

  // Write component file
  fs.writeFileSync(path.join(featureDir, `${pascalName}List.tsx`), componentContent);

  console.log(`✅ Frontend feature '${featureName}' generated successfully!`);
  console.log(`📁 Files created in: todo-frontend/src/components/${featureName}/`);
  console.log(`📝 Don't forget to create:`);
  console.log(`   1. ${pascalName}Item.tsx component`);
  console.log(`   2. ${pascalName}Form.tsx component`);
  console.log(`   3. ${featureName}Api.ts service`);
}

// Main execution
const featureName = process.argv[2];

if (!featureName) {
  console.error('❌ Please provide a feature name');
  console.log('Usage: npm run generate:feature <feature-name>');
  console.log('Example: npm run generate:feature user-profile');
  process.exit(1);
}

console.log(`🚀 Generating feature: ${featureName}`);

generateBackendFeature(featureName);
generateFrontendFeature(featureName);

console.log(`\n🎉 Feature '${featureName}' generated successfully!`);
console.log(`\n📋 Next steps:`);
console.log(`1. Update app.module.ts to include the new module`);
console.log(`2. Add entity to TypeORM configuration`);
console.log(`3. Create missing frontend components`);
console.log(`4. Add API service for frontend`);
console.log(`5. Write tests for the new feature`);